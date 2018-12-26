import { Component, HostListener, Injector } from '@angular/core'
import { IonicPage, NavParams, ViewController } from 'ionic-angular'
import { BasePage } from '../../pages/base/base-page'
import { DeviceProvider } from "../../providers/device/device"
import { DeviceOperateArgLE, DeviceOperateTypeEnum } from "../../providers/device/entity/arg"
import { DeviceRE } from "../../providers/entity/device/device"
import { LoadingStatusEnum } from "../loading-page/load-status-anime/load-status-anime"
import { LoadingPageConfig, LoadingPageController } from "../loading-page/loading-page-controller"
import { DeviceOperateConfig } from "./device-operate-controller"

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-device-operate',
  templateUrl: 'device-operate.html',
})
export class DeviceOperatePage extends BasePage {
  data: DeviceRE
  duration: string

  opType = 1
  private config: DeviceOperateConfig

  constructor(protected injector: Injector, public viewCtrl: ViewController, public navParams: NavParams,
              public deviceProvider: DeviceProvider, public loadingPageCtrl: LoadingPageController) {
    super(injector)
  }

  onCreate() {
    this.config = this.navParams.get('config')
    this.data = this.config.device
  }

  onOperateClick(type: DeviceOperateTypeEnum, position: number = 0) {
    let deviceOperateArg = new DeviceOperateArgLE()
    deviceOperateArg.opType = type
    deviceOperateArg.args.position = position
    deviceOperateArg.args.duration = this.opType === 1 ? (this.duration ? Number(this.duration) * 60 : 0) : 0 //单位s

    let loadingPageConfig = new LoadingPageConfig()
    this.loadingPageCtrl.present(loadingPageConfig).then(() => {
      this.deviceProvider.postDeviceOperate(this.data.id, deviceOperateArg)
        .subscribe(
          (v) => {
            Object.assign(this.data, v)
            this.duration = undefined
            this.config.onOperateSucceed(this.data)
            loadingPageConfig.change(LoadingStatusEnum.Succeed, '操作成功')
          },
          (v) => {
            loadingPageConfig.change(LoadingStatusEnum.Failed, v.message ? v.message : '操作失败')
          })
    })
  }

  @HostListener('click')
  backdrop() {
    this.viewCtrl.dismiss()
  }
}

