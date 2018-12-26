import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { DataLoadHelp } from '../../../../extend/data-help/data-load-help'
import { DataStatusEnum } from '../../../../extend/data-help/data-status-enum'
import { IrrigateTaskRE } from "../../../../providers/entity/irrigate/irrigate"
import { IrrigateProvider } from '../../../../providers/irrigate/irrigate'
import { ToastControllerExProvider } from '../../../../providers/toast-control-ex/toast-controler-ex'
import { BasePage } from '../../../base/base-page'

@IonicPage({defaultHistory: ['IasPage']})
@Component({
  selector: 'page-irrigate-task-history',
  templateUrl: 'irrigate-task-history.html',
})
export class IrrigateTaskHistoryPage extends BasePage {
  irrigateId: number
  irrigateName: string
  data: IrrigateTaskRE[] = []
  dataLoadHelp: DataLoadHelp

  constructor(protected injector: Injector, public navCtrl: NavController, public navParams: NavParams,
              public toastCtrl: ToastControllerExProvider, public irrigateProvider: IrrigateProvider) {
    super(injector)
    this.irrigateId = this.navParams.data.irrigateId
    this.irrigateName = this.navParams.data.irrigateName
  }

  onCreate() {
    this.dataLoadHelp = new DataLoadHelp(this.loadErrorTipCmp, undefined, this.loadMoreCmp)
    this.getData(DataStatusEnum.Content)
  }

  getData(status: DataStatusEnum) {
    if (!this.dataLoadHelp.canLoad(status)) return
    let limit = 20
    this.irrigateProvider.getIrrigatesHistory(this.irrigateId, this.data.length, limit)
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          if (this.dataLoadHelp.dataStatus === DataStatusEnum.LoadMore) this.data = this.data.concat(v)
          else this.data = v
          this.dataLoadHelp.loadSucceed(v.length < limit)
        },
        (v) => {
          this.dataLoadHelp.loadFailed(v, this.getData.bind(this, status))
        }
      )
  }

  trackById(index: number, v: IrrigateTaskRE) {
    return `${index},${v.createDate}`
  }
}
