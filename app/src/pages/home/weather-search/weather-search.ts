import { Component, EventEmitter, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { empty } from 'rxjs/observable/empty'
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators'
import { LocalConfigProvider } from '../../../providers/local-config/local-config'
import { WeatherBasicRE } from '../../../providers/weather/entity/he-weather-6'
import { WeatherProvider } from '../../../providers/weather/weather'
import { BasePage } from '../../base/base-page'

@IonicPage({defaultHistory: ['HomePage']})
@Component({
  selector: 'page-weather-search',
  templateUrl: 'weather-search.html',
  host: {
    '[class.show-search-result]': 'searchResults.length > 0'
  }
})
export class WeatherSearchPage extends BasePage {
  searchKeyChangeEvent = new EventEmitter<string>()

  keyword = ''
  historys: string[] = []
  topCitys: WeatherBasicRE[] = []
  searchResults: WeatherBasicRE[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public weatherProvider: WeatherProvider, public localConfig: LocalConfigProvider) {
    super(injector)
  }

  onCreate() {
    this.getData()
  }

  onCityClick(v: WeatherBasicRE) {
    this.localConfig.weatherLastSelectEv.value = v
    this.weatherProvider.saveHistorySearch(v.location)
    this.navCtrl.pop()
  }

  onHistoryClick(v: string) {
    v = v.trim()
    this.keyword = v
    this.searchKeyChangeEvent.emit(v)
    this.loadErrorTipCmp.showLoading()
  }

  trackByIndex(index: number) {
    return index
  }

  private obsData() {
    this.searchKeyChangeEvent
      .pipe(
        map((v) => {
          v = v ? v.trim() : ''
          return v
        }),
        debounceTime(800),
        switchMap((v: string) => {
          if (v && v.length > 0) {
            if (this.searchResults.length <= 0) this.loadErrorTipCmp.showLoading()
            return this.weatherProvider.searchCity(v).pipe(
              catchError((v) => {
                this.searchResults = []
                this.loadErrorTipCmp.showError(v)
                return empty()
              })
            )
          }
          else {
            return new Observable((v) => {
              v.next([])
            })
          }
        }))
      .bindLifecycle(this)
      .subscribe(
        (v: WeatherBasicRE[]) => {
          this.searchResults = v
          this.loadErrorTipCmp.showContent()
        }
      )

    this.weatherProvider.onHistoryChangeEvent
      .pipe(switchMap(() => this.weatherProvider.getHistorySearch()))
      .bindLifecycle(this)
      .subscribe((v) => {
        this.historys = v
      })
  }

  private getData() {
    this.loadErrorTipCmp.showLoading()
    this.weatherProvider.getHistoryAndTop()
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.topCitys = v.top
          this.historys = v.history
          this.obsData()
          this.loadErrorTipCmp.showContent()
        },
        (v) => {
          this.loadErrorTipCmp.showError(v, this.getData.bind(this))
        })
  }
}
