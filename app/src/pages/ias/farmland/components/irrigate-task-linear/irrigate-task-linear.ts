import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  Output
} from '@angular/core'
import { STATE_DESTROYED } from 'ionic-angular/navigation/nav-util'
import { BaseComponent } from '../../../../../components/base/base-component'
import {
  IrrigationTaskController,
  IrrigationTaskDurationConfig
} from '../../../../../modal/irrigation-task-duration/irrigation-task-controller'
import { LoadingStatusEnum } from '../../../../../modal/loading-page/load-status-anime/load-status-anime'
import { LoadingPageConfig, LoadingPageController } from '../../../../../modal/loading-page/loading-page-controller'
import { IrrigateRE } from '../../../../../providers/entity/irrigate/irrigate'
import { IrrigateTaskStatusEnum } from '../../../../../providers/entity/irrigate/irrigate-enum'
import { IrrigationTaskTypeEnum } from '../../../../../providers/irrigate/entity/irrigation'
import { IrrigateProvider } from '../../../../../providers/irrigate/irrigate'

@Component({
  selector: 'irrigate-task-linear',
  templateUrl: 'irrigate-task-linear.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IrrigateTaskLinearComponent extends BaseComponent {
  @Input() farmLandId: number
  @Output() onTaskChange = new EventEmitter<Boolean>()
  percent = -2
  private runningTimeout: number

  _data: IrrigateRE

  @Input()
  get data(): IrrigateRE {
    return this._data
  }

  set data(v) {
    this._data = v
    this.setupRunningTaskTimeout()
  }

  constructor(protected injector: Injector, public cdr: ChangeDetectorRef, public irrigateProvider: IrrigateProvider,
              public irrigateDurationCtrl: IrrigationTaskController, public loadingPageCtrl: LoadingPageController) {
    super(injector)
  }

  onDestroy() {
    clearInterval(this.runningTimeout)
  }

  onCreateTaskClick() {
    let durationConfig = new IrrigationTaskDurationConfig(this.onTaskDuration.bind(this))
    this.irrigateDurationCtrl.present(durationConfig)
  }

  onCancelTaskClick() {
    this.onTaskDuration(0)
  }

  setupRunningTaskTimeout() {
    clearInterval(this.runningTimeout)
    this.percent = -2
    if (!this.data.task) return
    if (this.data.task.status === IrrigateTaskStatusEnum.Runed || this.data.task.status === IrrigateTaskStatusEnum.Stoping) {
      this.changeRunningPercent(false)
      this.runningTimeout = setInterval(this.changeRunningPercent.bind(this), 30000)
    }
  }

  private changeRunningPercent(isAsync = true) {
    if (this.lastEvent === STATE_DESTROYED) return
    this.percent = this.irrigateProvider.calcTaskPercent(this.data.task)
    this.cdr.detectChanges()
    //任务执行完毕考虑刷新页面了
    if (isAsync && this.percent === 1) {
      clearInterval(this.runningTimeout)
      this.onTaskChange.emit(true)
    }
  }

  private onTaskDuration(duration: number) {
    let loadingPageConfig = new LoadingPageConfig()
    loadingPageConfig.text = '处理中...'
    this.loadingPageCtrl.present(loadingPageConfig).then(() => {
      let params = this.irrigateProvider.createIrrigationTaskParams(this.farmLandId, duration, [this.data])
      this.irrigateProvider.postIrrigationTask(params, duration <= 0 ? IrrigationTaskTypeEnum.Remove : IrrigationTaskTypeEnum.Create)
        .bindLifecycle(this)
        .subscribe(
          () => {
            this.onTaskChange.emit(true)
            loadingPageConfig.change(LoadingStatusEnum.Succeed, '操作成功', 2000)
          },
          (v) => {
            loadingPageConfig.change(LoadingStatusEnum.Failed, v.message ? v.message : '失败', 3000)
          }
        )
    })

  }
}
