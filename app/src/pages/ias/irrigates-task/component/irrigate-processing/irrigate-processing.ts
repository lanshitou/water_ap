import { Component, forwardRef, Inject, Injector, Input, ViewChild } from '@angular/core'
import { Content, NavController, NavParams } from "ionic-angular"
import { ServerInject } from "../../../../../app/app.component"
import { BaseComponent } from "../../../../../components/base/base-component"
import { ErrorCode } from "../../../../../contract/error-code"
import { DataLoadHelp } from "../../../../../extend/data-help/data-load-help"
import { DataStatusEnum } from "../../../../../extend/data-help/data-status-enum"
import { IrrigateTaskProcessingRE } from "../../../../../providers/irrigate/entity/processing-irrigate"
import { IrrigateProvider } from "../../../../../providers/irrigate/irrigate"
import { ToastControllerExProvider } from "../../../../../providers/toast-control-ex/toast-controler-ex"
import { IrrigatesTaskPage } from "../../irrigates-task"

@Component({
  selector: 'irrigate-processing',
  templateUrl: 'irrigate-processing.html',
  host: {
    '[class.hidden]': '!show'
  }
})
export class IrrigateProcessingComponent extends BaseComponent {
  data: IrrigateTaskProcessingRE[]

  dataLoadHelp: DataLoadHelp

  @ViewChild(Content) contentCmp: Content

  private _show: boolean

  @Input() get show(): boolean {
    return this._show
  }

  set show(value: boolean) {
    if (value === undefined || value === this._show) return
    this._show = value
    if (this._show && this.dataLoadHelp && !this.data) this.getData(DataStatusEnum.Content)
  }

  constructor(protected injector: Injector, public navCtrl: NavController, public navParams: NavParams,
              public irrigateProvider: IrrigateProvider, public toastCtrl: ToastControllerExProvider,
              @Inject(forwardRef(() => IrrigatesTaskPage)) public parentPage: IrrigatesTaskPage) {
    super(injector)
  }

  onCreate() {
    this.dataLoadHelp = new DataLoadHelp(this.loadErrorTipCmp, this.pullRefreshCmp)
    if (this.show) this.getData(DataStatusEnum.Content)
  }

  trackById(index: number, data: {id: number}) {
    return data.id
  }

  getData(status: DataStatusEnum) {
    if (!this.dataLoadHelp.canLoad(status)) return
    this.irrigateProvider.getIrrigatesTaskProcessing()
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.data = v
          this.dataLoadHelp.loadSucceed()
        },
        (v) => {
          this.dataLoadHelp.loadFailed(v, this.getData.bind(this, status))

          if (status !== DataStatusEnum.LoadMore && v.code === ErrorCode.Empty) {
            this.data = []
            this.loadErrorTipCmp.showError('目前没有正在进行的灌溉任务', this.getData.bind(this, DataStatusEnum.Content))

            if (status === DataStatusEnum.Content) this.parentPage.selectSegment = 1
          } else if (status === DataStatusEnum.Refresh) {
            let toast = ServerInject.get(ToastControllerExProvider)
            toast.show({message: v.message})
          }
        }
      )
  }
}
