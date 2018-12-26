import { Component, Injector, Input, ViewChild } from '@angular/core'
import { Content, NavController, NavParams } from "ionic-angular"
import { ServerInject } from "../../../../../app/app.component"
import { BaseComponent } from "../../../../../components/base/base-component"
import { ErrorCode } from "../../../../../contract/error-code"
import { DataLoadHelp } from "../../../../../extend/data-help/data-load-help"
import { DataStatusEnum } from "../../../../../extend/data-help/data-status-enum"
import {
  IrrigationTaskController,
  IrrigationTaskDurationConfig
} from "../../../../../modal/irrigation-task-duration/irrigation-task-controller"
import { LoadingStatusEnum } from "../../../../../modal/loading-page/load-status-anime/load-status-anime"
import { LoadingPageConfig, LoadingPageController } from "../../../../../modal/loading-page/loading-page-controller"
import { IrrigationTaskLE, IrrigationTaskTypeEnum } from "../../../../../providers/irrigate/entity/irrigation"
import { IasIrrigatesRLE } from "../../../../../providers/irrigate/entity/task-irrigates"
import { IrrigateProvider } from "../../../../../providers/irrigate/irrigate"
import { ToastControllerExProvider } from "../../../../../providers/toast-control-ex/toast-controler-ex"

@Component({
  selector: 'irrigate-task-list',
  templateUrl: 'irrigate-task-list.html',
  host: {
    '[class.hidden]': '!show'
  }
})
export class IrrigateTaskListComponent extends BaseComponent {
  data: IasIrrigatesRLE[]
  selectSize = 0
  dataLoadHelp: DataLoadHelp

  @Input() isAddIrrigate: boolean
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
              public irrigateDurationCtrl: IrrigationTaskController, public loadingPageCtrl: LoadingPageController,
              public irrigateProvider: IrrigateProvider, public toastCtrl: ToastControllerExProvider) {
    super(injector)
  }

  onCreate() {
    this.dataLoadHelp = new DataLoadHelp(this.loadErrorTipCmp, this.pullRefreshCmp)
    if (this.show) this.getData(DataStatusEnum.Content)
  }

  getData(status: DataStatusEnum) {
    if (!this.dataLoadHelp.canLoad(status)) return
    this.irrigateProvider.getIrrigatesTask(this.isAddIrrigate)
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.selectSize = 0
          this.data = v
          this.dataLoadHelp.loadSucceed()
        },
        (v) => {
          this.dataLoadHelp.loadFailed(v, this.getData.bind(this, status))

          if (status !== DataStatusEnum.LoadMore && v.code === ErrorCode.Empty) {
            this.data = []
            this.loadErrorTipCmp.showError('数据为空', this.getData.bind(this, DataStatusEnum.Content))
          } else if (status === DataStatusEnum.Refresh) {
            let toast = ServerInject.get(ToastControllerExProvider)
            toast.show({message: v.message})
          }
        }
      )
  }

  //农田 选择状态
  onSelectAllChange(data: IasIrrigatesRLE) {
    let selectAll = data.selectedSize !== data.selectableSize
    if (selectAll) data.selectedSize = data.selectableSize
    else data.selectedSize = 0
    data.irrigates.forEach((v) => {
      if (v.selected !== selectAll) {
        v.selected = selectAll
        if (selectAll) this.selectSize++
        else this.selectSize--
      }
    })
  }

  //任务 选择状态
  onTaskSelectChange(farmland: IasIrrigatesRLE, select: boolean) {
    if (select) {
      this.selectSize++
      farmland.selectedSize++
    }
    else {
      this.selectSize--
      farmland.selectedSize--
    }
  }

  //执行任务
  onSelectDoneClick() {
    if (this.selectSize <= 0) {
      this.toastCtrl.show({message: '请先选择一个灌溉区'})
      return
    }
    if (this.isAddIrrigate) {
      let durationConfig = new IrrigationTaskDurationConfig(this.onTaskDuration.bind(this))
      this.irrigateDurationCtrl.present(durationConfig)
    }
    else {
      this.onTaskDuration(-1)
    }
  }

  trackById(index: number, data: {id: number}) {
    return data.id
  }

  private onTaskDuration(duration: number) {
    let loadingPageConfig = new LoadingPageConfig()
    loadingPageConfig.text = '处理中...'
    this.loadingPageCtrl.present(loadingPageConfig)

    let allParams: IrrigationTaskLE[] = []
    this.data.forEach((v) => {
      //单位s
      let params = this.irrigateProvider.createIrrigationTaskParams(v.id, duration,
        v.irrigates.filter((v) => v.selected && v.enable))
      allParams = allParams.concat(params)
    })

    this.irrigateProvider.postIrrigationTask(allParams, duration === -1 ? IrrigationTaskTypeEnum.Remove : IrrigationTaskTypeEnum.Create)
      .bindLifecycle(this)
      .subscribe(
        () => {
          this.navCtrl.removeView(this.viewController, {animate: false})
          loadingPageConfig.change(LoadingStatusEnum.Succeed, '操作成功', 2000)
        },
        (v) => {
          loadingPageConfig.change(LoadingStatusEnum.Failed, v.message ? v.message : '失败', 3000)
        }
      )
  }
}
