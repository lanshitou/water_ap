import { Component, ElementRef, Injector, Renderer2, ViewChild } from '@angular/core'
import { Header, IonicPage, NavController, NavParams } from 'ionic-angular'
import { empty } from "rxjs/observable/empty"
import { catchError, switchMap } from "rxjs/operators"
import { ServerInject } from "../../app/app.component"
import { WeatherComponent } from "../../components/weather/weather"
import { ErrorCode } from "../../contract/error-code"
import { DataLoadHelp } from "../../extend/data-help/data-load-help"
import { DataStatusEnum } from "../../extend/data-help/data-status-enum"
import { getServerTime } from "../../providers/base/base-interceptor"
import { InfoPreviewWarpRE } from "../../providers/info/entity/info-preview-warp"
import { InfoProvider } from "../../providers/info/InfoProvider"
import { LocalConfigProvider } from "../../providers/local-config/local-config"
import { ImportantMessageRE } from "../../providers/message/entity/message"
import { MessageProvider } from "../../providers/message/message"
import { ToastControllerExProvider } from "../../providers/toast-control-ex/toast-controler-ex"
import { UserOauthRE } from "../../providers/user/entity/user-oauth"
import { WeatherAllWrapRE } from "../../providers/weather/entity/he-weather-6"
import { WeatherProvider } from "../../providers/weather/weather"
import { BaseTabPage } from "../base/BaseTabPage"

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage extends BaseTabPage {
  //天气相关
  currentWeatherLocation: string = '获取中...'
  currentWeatherData: WeatherAllWrapRE

  notifyMessageData: ImportantMessageRE[]
  infoData: InfoPreviewWarpRE[]

  @ViewChild(WeatherComponent, {read: WeatherComponent}) weatherCmp: WeatherComponent
  @ViewChild(Header, {read: Header}) headerCmp: Header
  dataLoadHelp: DataLoadHelp

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public infoProvider: InfoProvider, public weatherProvider: WeatherProvider, public  messageProvider: MessageProvider,
              public render2: Renderer2, public ele: ElementRef, public localConfig: LocalConfigProvider) {
    super(injector)
  }

  onCreate() {
    this.dataLoadHelp = new DataLoadHelp(this.loadErrorTipCmp, this.pullRefreshCmp)
    this.obsData()
    this.getData(DataStatusEnum.Content)
  }

  onEnter() {
    this.getData(this.infoData === undefined ? DataStatusEnum.Content : DataStatusEnum.Refresh)
  }

  onOauthStateChange(entity: UserOauthRE | undefined): void {
    super.onOauthStateChange(entity)
    if (!entity) this.notifyMessageData = undefined
  }

  getData(status: DataStatusEnum) {
    if (!this.dataLoadHelp.canLoad(status)) return

    //获取资讯
    if (!this.infoData || status === DataStatusEnum.Content) {
      this.infoProvider.getInfoList()
        .bindLifecycle(this)
        .subscribe(
          (v) => {
            this.infoData = v
            this.dataLoadHelp.loadSucceed()
          },
          (v) => {
            if (v.code === ErrorCode.Empty) {
              this.infoData = []
              this.dataLoadHelp.loadSucceed()
            } else {
              this.dataLoadHelp.loadFailed(v, this.getData.bind(this, status))
            }
          })
    } else {
      this.dataLoadHelp.loadSucceed()
    }

    this.messageProvider.getImportantMessage()
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.notifyMessageData = v
        },
        (v) => {
          if (status === DataStatusEnum.Refresh && v.code !== ErrorCode.Empty) {
            let toast = ServerInject.get(ToastControllerExProvider)
            toast.show({message: v.message})
          } else {
            this.notifyMessageData = []
          }
        }
      )

    //在没有天气数据的时候刷新or间隔2H刷新一次
    if (!this.currentWeatherData || getServerTime() - new Date(this.currentWeatherData.update.loc).getTime() >= 2 * 1000 * 60 * 60) {
      this.localConfig.weatherLastSelectEv.notifyAgain()
    }
  }

  trackById(index: number, v: any) {
    return v.id
  }

  private obsData() {
    //天气城市改变
    this.localConfig.weatherLastSelectEv.changeEvent
      .pipe(switchMap(() => {
        this.pullRefreshCmp.startRefresh()
        return this.weatherProvider.getCityWeather().pipe(catchError(() => {
          this.pullRefreshCmp.stopRefresh()
          this.currentWeatherLocation = '获取失败'
          return empty()
        }))
      }))
      .bindLifecycle(this)
      .subscribe(
        (v: WeatherAllWrapRE) => {
          this.pullRefreshCmp.stopRefresh()
          this.currentWeatherLocation = v.basic.location
          this.currentWeatherData = v
        }
      )
  }
}
