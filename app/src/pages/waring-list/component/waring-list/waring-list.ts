import { Component, Injector, Input, ViewChild } from '@angular/core'
import { App, Content, NavController, NavParams } from "ionic-angular"
import { ServerInject } from "../../../../app/app.component"
import { BaseComponent } from "../../../../components/base/base-component"
import { ImgErrorEmpty } from "../../../../components/loading-error-tip/loading-error-tip"
import { ErrorCode } from "../../../../contract/error-code"
import { DataLoadHelp } from "../../../../extend/data-help/data-load-help"
import { DataStatusEnum } from "../../../../extend/data-help/data-status-enum"
import { calcContentDimensions } from "../../../../extend/ionic/content"
import { GetWaringTypeEnum } from "../../../../providers/entity/waring/waring-enum"
import { ToastControllerExProvider } from "../../../../providers/toast-control-ex/toast-controler-ex"
import { WaringSummaryRE } from "../../../../providers/waring/entity/waring-summary"
import { WaringProvider } from "../../../../providers/waring/waring"

@Component({
  selector: 'waring-list',
  templateUrl: 'waring-list.html',
  host: {
    '[class.hidden]': '!show',
    '[class.isHistory]': 'isHistory'
  }
})
export class WaringListComponent extends BaseComponent {
  data: WaringSummaryRE[] = []
  dataLoadHelp: DataLoadHelp

  @Input() isHistory: boolean
  @Input() type: GetWaringTypeEnum
  @ViewChild(Content) contentCmp: Content

  private _show: boolean

  @Input() get show(): boolean {
    return this._show
  }

  set show(value: boolean) {
    if (value === undefined || value === this._show) return
    this._show = value
    if (this._show && this.dataLoadHelp && this.data.length <= 0) this.getData(DataStatusEnum.Content)
  }

  constructor(protected injector: Injector, public navCtrl: NavController, public navParams: NavParams,
              public waringProvider: WaringProvider, public toastProvider: ToastControllerExProvider) {
    super(injector)
  }

  onCreate() {
    this.dataLoadHelp = new DataLoadHelp(this.loadErrorTipCmp, this.pullRefreshCmp, this.loadMoreCmp)
    if (!this.isHistory) this.loadMoreCmp.setDisable()
    else calcContentDimensions(this.contentCmp)
    if (this.show) this.getData(DataStatusEnum.Content)
  }

  getData(status: DataStatusEnum) {
    if (!this.dataLoadHelp.canLoad(status)) return
    this.waringProvider.getWaringSummary(this.type, this.isHistory, status === DataStatusEnum.Refresh ? 0 : this.data.length, 10)
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          if (status === DataStatusEnum.LoadMore) this.data = this.data.concat(v)
          else this.data = v
          this.dataLoadHelp.loadSucceed()
        },
        (v) => {
          this.dataLoadHelp.loadFailed(v, this.getData.bind(this, status))

          if (status !== DataStatusEnum.LoadMore && v.code === ErrorCode.Empty) {
            this.data = []
            this.loadErrorTipCmp.showError('暂无相关告警', this.getData.bind(this, DataStatusEnum.Content), ImgErrorEmpty)
          } else if (status === DataStatusEnum.Refresh) {
            let toast = ServerInject.get(ToastControllerExProvider)
            toast.show({message: v.message})
          }
        }
      )
  }

  onItemClick(item: WaringSummaryRE) {
    this.waringProvider.getWaringDetail(item.id)
      .loadingOperate()
      .subscribe(
        (v) => {
          switch (this.type) {
            case GetWaringTypeEnum.Alarm:
              ServerInject.get(App).getActiveNav().push('MessageDetailAlarmPage', {ext: v})
              break
            case GetWaringTypeEnum.Offline:
              ServerInject.get(App).getActiveNav().push('MessageDetailOfflinePage', {ext: v})
              break
            case GetWaringTypeEnum.Irrigate:
              ServerInject.get(App).getActiveNav().push('MessageDetailIrrigatePage', {ext: v})
              break
            case GetWaringTypeEnum.Other:
              this.toastProvider.show({message: `暂不支持 该类型告警详情, 努力开发中... : `})
              break
            default:
              this.toastProvider.show({message: `未知消息类型 : ${this.type}`})
              break
          }
        },
        (v) => {
          this.toastProvider.show({message: v.message})
        }
      )
  }

  trackById(index: number, v: any) {
    return v.id
  }
}
