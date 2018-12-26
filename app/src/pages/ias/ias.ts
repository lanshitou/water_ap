import { Component, ElementRef, Injector, QueryList, ViewChild, ViewChildren } from '@angular/core'
import { IonicPage, SegmentButton } from 'ionic-angular'
import { timer } from 'rxjs/observable/timer'
import { switchMap } from 'rxjs/operators'
import { ServerInject } from "../../app/app.component"
import { DevBaseComponent } from "../../components/base/dev-base-component"
import { ScrollYContainerComponent } from "../../components/scroll-y-container/scroll-y-container"
import { DataLoadHelp } from '../../extend/data-help/data-load-help'
import { DataStatusEnum } from '../../extend/data-help/data-status-enum'
import { calcContentDimensions } from "../../extend/ionic/content"
import { LoadingStatusEnum } from "../../modal/loading-page/load-status-anime/load-status-anime"
import { LoadingPageConfig, LoadingPageController } from "../../modal/loading-page/loading-page-controller"
import { DeviceProvider } from "../../providers/device/device"
import { LocalConfigProvider } from '../../providers/local-config/local-config'
import { SystemPreviewRE } from '../../providers/system/entity/preview'
import { ModeEnum, SystemsRE } from "../../providers/system/entity/systems"
import { SystemProvider } from '../../providers/system/system'
import { ToastControllerExProvider } from "../../providers/toast-control-ex/toast-controler-ex"
import { BaseTabPage } from '../base/BaseTabPage'

@IonicPage()
@Component({
  selector: 'page-ias',
  templateUrl: 'ias.html',
})
export class IasPage extends BaseTabPage {
  data: SystemPreviewRE
  checkedSystemId: number

  dataMap = new Map<number, SystemPreviewRE>()
  systemList: SystemsRE[] = []

  dataLoad: DataLoadHelp

  @ViewChildren(SegmentButton, {read: ElementRef}) segmentButtonEles: QueryList<ElementRef>
  @ViewChildren(DevBaseComponent, {read: DevBaseComponent}) devBaseCmps: QueryList<DevBaseComponent>
  @ViewChild(ScrollYContainerComponent) syCmp: ScrollYContainerComponent

  constructor(public systemsProvider: SystemProvider, protected injector: Injector, public config: LocalConfigProvider,
              public loadingPage: LoadingPageController, public deviceProvider: DeviceProvider) {
    super(injector)
  }

  onCreate() {
    this.dataLoad = new DataLoadHelp(this.loadErrorTipCmp, this.pullRefreshCmp)
    this.obsData()
    this.getData(DataStatusEnum.Content)
  }

  onEnter() {
    this.getData(this.data === undefined ? DataStatusEnum.Content : DataStatusEnum.Refresh)
  }

  getData(status: DataStatusEnum) {
    if (!this.dataLoad.canLoad(status) || (status !== DataStatusEnum.Content && !this.data)) return

    this.systemsProvider.getSystemPreview()
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.data = v
          this.dataMap.set(this.data.id, this.data)
          this.setSystem()
          if (status === DataStatusEnum.Content) setTimeout(() => this.dataLoad.loadSucceed(), 200)
          else this.dataLoad.loadSucceed()

          setTimeout(() => {
            if (this.deviceProvider.sharkDeviceId !== undefined) {
              if (this.devBaseCmps.filter((v) => v.sharkDev(this.deviceProvider.sharkDeviceId, this.deviceProvider.sharkDeviceType)).length > 0) {
                this.deviceProvider.sharkDeviceId = undefined
                this.deviceProvider.sharkDeviceType = undefined
              }
            }
          }, 200)

        },
        (v) => {
          this.setSystem()
          if (status === DataStatusEnum.Refresh) {
            let toast = ServerInject.get(ToastControllerExProvider)
            toast.show({message: v.message})
          }
          this.dataLoad.loadFailed(v, this.getData.bind(this, status))
        }
      )
  }

  //主动改变系统
  changeCheckedSystem(id: number) {
    this.systemsProvider.checkedSystem(id)
  }

  trackById(index: number, v: any) {
    return v.id
  }

  onSwitchModeClick() {
    let config = new LoadingPageConfig()
    config.text = `正在切换到 ${this.data.mode === ModeEnum.Auto ? '手动模式' : '自动模式'}`
    this.loadingPage.present(config)
    this.systemsProvider.postChangeMode(this.data.mode === ModeEnum.Auto ? ModeEnum.Manual : ModeEnum.Auto)
      .subscribe(
        () => {
          config.change(LoadingStatusEnum.Succeed, `切换到 ${this.data.mode === ModeEnum.Auto ? '手动模式' : '自动模式'} 成功`)
          this.getData(DataStatusEnum.Content)
        },
        () => {
          config.change(LoadingStatusEnum.Failed, `切换 ${this.data.mode === ModeEnum.Auto ? '手动模式' : '自动模式'} 失败`)
        }
      )
  }

  scrollToPosition() {
    if (this.segmentButtonEles && this.syCmp) {
      let index = this.systemList.findIndex((v) => this.checkedSystemId === v.id)
      let button = this.segmentButtonEles.find((_, i) => i === index).nativeElement as HTMLElement
      this.syCmp.scrollToEle(button)
    }
  }

  //设置列表和当前选中的系统
  private setSystem() {
    if (SystemProvider.checkedSystemId === undefined || !SystemProvider.systemList) return

    this.checkedSystemId = SystemProvider.checkedSystemId
    this.systemList = SystemProvider.systemList

    calcContentDimensions(this.contentCmp)

    //让Y轴滚动到合适的位置
    setTimeout(() => {
      this.scrollToPosition()
    })
  }

  private obsData() {
    //触发定时刷新
    this.config.refreshTimeEv.notifyAgain()

    //定时刷新时间改变
    this.config.refreshTimeEv.changeEvent
      .pipe(switchMap((v: number) => timer(v, v)))
      .bindLifecycle(this)
      .subscribe(() => this.getData(DataStatusEnum.Refresh))

    this.config.lastSelectSystemEv.changeEvent.subscribe(
      (v) => {
        this.data = this.dataMap.get(v)
        this.getData(DataStatusEnum.Content)
        this.checkedSystemId = v
      }
    )
  }
}
