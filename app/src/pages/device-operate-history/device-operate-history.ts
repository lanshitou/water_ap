import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { DataLoadHelp } from "../../extend/data-help/data-load-help"
import { DataStatusEnum } from "../../extend/data-help/data-status-enum"
import { DeviceProvider } from "../../providers/device/device"
import { DeviceOperateHistoryRE } from "../../providers/device/entity/device-operate-history"
import { DeviceRE } from "../../providers/entity/device/device"
import { BasePage } from "../base/base-page"

@IonicPage()
@Component({
  selector: 'page-device-operate-history',
  templateUrl: 'device-operate-history.html',
})
export class DeviceOperateHistoryPage extends BasePage {
  device: DeviceRE
  data: DeviceOperateHistoryRE[] = []
  dataLoadHelp = new DataLoadHelp()

  constructor(protected injector: Injector, public navCtrl: NavController, public navParams: NavParams,
              public deviceProvider: DeviceProvider) {
    super(injector)
    this.device = this.navParams.data
  }

  onCreate() {
    this.dataLoadHelp = new DataLoadHelp(this.loadErrorTipCmp, undefined, this.loadMoreCmp)
    this.getData(DataStatusEnum.Content)
  }

  getData(status: DataStatusEnum) {
    if (!this.dataLoadHelp.canLoad(status)) return
    let limit = 20
    this.deviceProvider.getDeviceOperateHistory(this.device.id, this.data.length, limit)
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          if (status === DataStatusEnum.LoadMore) this.data = this.data.concat(v)
          else this.data = v
          this.dataLoadHelp.loadSucceed(v.length < limit)
        },
        (v) => {
          this.dataLoadHelp.loadFailed(v, this.getData.bind(this, status))
        }
      )
  }

  trackById(index: number, data: {id: number}) {
    return data.id
  }
}
