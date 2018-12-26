import { EventEmitter, Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { fromPromise } from 'rxjs/observable/fromPromise'
import { _throw } from 'rxjs/observable/throw'
import { catchError, map, switchMap } from 'rxjs/operators'
import { zipStatic } from 'rxjs/operators/zip'
import { ErrorCode } from '../../contract/error-code'
import { WeatherKey } from '../../contract/key'
import { Lsk } from '../../contract/lsk'
import { storage } from '../../extend/ionic/storage'
import { Api } from '../base/api'
import { LocalConfigProvider } from '../local-config/local-config'
import {
  WeatherAllResultRE,
  WeatherAllWrapRE,
  WeatherBasicRE,
  WeatherResultRE,
  WeatherSearchResultRE
} from './entity/he-weather-6'

@Injectable()
export class WeatherProvider extends Api {
  onHistoryChangeEvent = new EventEmitter<boolean>()

  constructor(public config: LocalConfigProvider) {
    super()
  }

  //获取城市 和历史记录的合集
  getHistoryAndTop(): Observable<{history: string[], top: WeatherBasicRE[]}> {
    let history = this.getHistorySearch()
    let top = this.getTopCity()
    return zipStatic(history, top, (h, t) => {
      return {history: h, top: t}
    })
  }

  //搜索城市
  searchCity(keyWord: string): Observable<WeatherBasicRE[]> {
    return this.http.get('https://search.heweather.com/find', {
      params: {
        key: WeatherKey,
        group: 'cn',
        number: '30',
        location: keyWord
      },
      headers: {NoAppToken: 'true'}
    })
      .apiOperate<WeatherSearchResultRE>(WeatherSearchResultRE, false)
      .pipe(
        switchMap((v: WeatherSearchResultRE) =>
          this.handleError(v)
        ),
        map((v: WeatherSearchResultRE) =>
          v.heWeather[0].basic)
      )
  }

  //获取城市天气
  getCityWeather(): Observable<WeatherAllWrapRE> {
    return this.http.get('https://free-api.heweather.com/s6/weather', {
      params: {
        key: WeatherKey,
        group: 'cn',
        number: '30',
        location: this.config.weatherLastSelectEv.value ? this.config.weatherLastSelectEv.value.cid : 'auto_ip'
      },
      headers: {NoAppToken: 'true'}
    })
      .apiOperate<WeatherAllResultRE>(WeatherAllResultRE, false)
      .pipe(
        switchMap((v: WeatherAllResultRE) => this.handleError(v)),
        map((v: WeatherAllResultRE) => v.heWeather[0])
      )
  }

  //搜索历史记录
  getHistorySearch(): Observable<string[]> {
    return fromPromise(storage.get(Lsk.WeatherCitySearchHistory))
      .apiOperate<string[]>(String, false)
      .pipe(catchError(() => {
        return Observable.create((v) => {
          v.next([])
        })
      })) as Observable<string[]>
  }

  //清空历史记录
  cleanHistorySearch() {
    storage.remove(Lsk.WeatherCitySearchHistory).then(() => {
      this.onHistoryChangeEvent.emit(true)
    })
  }

  //保存搜索记录
  saveHistorySearch(keyword: string) {
    if (!keyword || keyword.length === 0) return
    this.getHistorySearch()
      .subscribe(
        (v) => {
          let findIndex = v.findIndex((result) => result === keyword)
          if (findIndex !== -1) v[findIndex] = keyword //有以往的数据 替换
          else v.push(keyword)
          storage.set(Lsk.WeatherCitySearchHistory, v).then((v) => {
            this.onHistoryChangeEvent.emit(true)
          })
        }
      )
  }

  //热门城市
  private getTopCity(): Observable<WeatherBasicRE[]> {
    return this.http.get('https://search.heweather.com/top', {
      params: {
        key: WeatherKey,
        group: 'cn',
        number: '12'
      },
      headers: {NoAppToken: 'true'}
    })
      .apiOperate<WeatherSearchResultRE>(WeatherSearchResultRE, false)
      .pipe(
        switchMap((v: WeatherSearchResultRE) => this.handleError(v)),
        map((v: WeatherSearchResultRE) => v.heWeather[0].basic)
      )
  }

  private handleError<T extends WeatherResultRE>(v: T): Observable<T> {
    if (v.heWeather[0].status === 'ok') {
      return Observable.create((o) => {
        o.next(v)
      })
    }
    return _throw({code: ErrorCode.Empty, message: '好像没有找到对应的城市, 您可以这样搜索 例如: 北京'})
  }
}
