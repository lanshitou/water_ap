import { Component, Injector, QueryList, ViewChildren } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { DevBaseComponent } from "../../../components/base/dev-base-component"
import { DataLoadHelp } from "../../../extend/data-help/data-load-help"
import { DataStatusEnum } from "../../../extend/data-help/data-status-enum"
import { DeviceProvider } from "../../../providers/device/device"
import { FarmlandRE } from '../../../providers/farmland/entity/farmland'
import { FarmlandProvider } from '../../../providers/farmland/farmland'
import { BasePage } from '../../base/base-page'

@IonicPage({defaultHistory: ['IasPage']})
@Component({
  selector: 'page-farmland',
  templateUrl: 'farmland.html',
})
export class FarmlandPage extends BasePage {
  id: number
  data: FarmlandRE
  dataLoadHelp: DataLoadHelp

  @ViewChildren(DevBaseComponent, {read: DevBaseComponent}) devBaseCmps: QueryList<DevBaseComponent>

  constructor(protected injector: Injector, public navCtrl: NavController, public navParams: NavParams,
              public farmlandProvider: FarmlandProvider, public deviceProvider: DeviceProvider) {
    super(injector)
    this.id = navParams.data
  }

  onCreate() {
    this.dataLoadHelp = new DataLoadHelp(this.loadErrorTipCmp, this.pullRefreshCmp)
    this.getData(DataStatusEnum.Content)
  }

  trackById(index: number, v: any) {
    return v.id
  }

  getData(status: DataStatusEnum) {
    if (!this.dataLoadHelp.canLoad(status)) return
    this.farmlandProvider.getFarmLand(this.id)
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.data = v
          this.dataLoadHelp.loadSucceed()

          if (status === DataStatusEnum.Content && (this.deviceProvider.sharkDeviceId !== undefined || this.deviceProvider.sharkIrrigateId !== undefined)) {
            setTimeout(() => {
              if (this.deviceProvider.sharkDeviceId !== undefined || this.deviceProvider.sharkIrrigateId !== undefined) {
                if (this.devBaseCmps.filter((v) => v.sharkDev(this.deviceProvider.sharkDeviceId !== undefined ? this.deviceProvider.sharkDeviceId : this.deviceProvider.sharkIrrigateId, this.deviceProvider.sharkDeviceType)).length > 0) {
                  this.deviceProvider.sharkDeviceId = undefined
                  this.deviceProvider.sharkDeviceType = undefined
                }
              }
            }, 200)
          }
        },
        (v) => {
          this.dataLoadHelp.loadFailed(v, this.getData.bind(this))
        }
      )
  }
}
