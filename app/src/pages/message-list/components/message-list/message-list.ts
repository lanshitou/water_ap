import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input, ViewChild } from '@angular/core'
import { Content } from 'ionic-angular'
import { debounceTime } from "rxjs/operators"
import { BaseComponent } from '../../../../components/base/base-component'
import { ImgErrorEmpty } from "../../../../components/loading-error-tip/loading-error-tip"
import { ErrorCode } from "../../../../contract/error-code"
import { DataLoadHelp } from '../../../../extend/data-help/data-load-help'
import { DataStatusEnum } from '../../../../extend/data-help/data-status-enum'
import { calcContentDimensions } from "../../../../extend/ionic/content"
import { BaseMessageRE } from '../../../../providers/message/entity/message'
import { GetMessageTypeEnum } from '../../../../providers/message/entity/message-type'
import { MessageProvider } from '../../../../providers/message/message'

@Component({
  selector: 'message-list',
  templateUrl: 'message-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.hidden]': '!show'
  }
})
export class MessageListComponent extends BaseComponent {
  @Input() type: GetMessageTypeEnum
  @Input() systemId: number
  @ViewChild(Content) content: Content

  data: BaseMessageRE[]
  dataLoadHelp: DataLoadHelp
  refreshByNotify = false //通知触发刷新

  _show: boolean

  @Input()
  get show() {
    return this._show
  }

  set show(v) {
    if (v === this._show) return
    this._show = v
    if (v) this.getData(this.refreshByNotify ? DataStatusEnum.Refresh : DataStatusEnum.Content)
  }

  constructor(protected injector: Injector, public messageProvider: MessageProvider,
              public cdr: ChangeDetectorRef) {
    super(injector)
  }

  onCreate() {
    calcContentDimensions(this.content)
    this.dataLoadHelp = new DataLoadHelp(this.loadErrorTipCmp, this.pullRefreshCmp, this.loadMoreCmp)
    this.obsData()
    this.getData(DataStatusEnum.Content)
  }

  getData(status: DataStatusEnum) {
    //如果Content 有数据那么不刷新 , show 改变时会多次触发
    if (status === DataStatusEnum.Content && this.data !== undefined) return
    if (!this.show || !this.dataLoadHelp || !this.dataLoadHelp.canLoad(status)) return
    let limit = 6
    this.refreshByNotify = false
    this.messageProvider.getMessageList(this.type, status === DataStatusEnum.LoadMore ? (this.data ? this.data.length : 0) : 0, limit, this.systemId)
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          if (status === DataStatusEnum.LoadMore) this.data = this.data.concat(v)
          else this.data = v
          this.dataLoadHelp.loadSucceed(v.length < limit)
          this.cdr.detectChanges()
        },
        (v) => {
          this.dataLoadHelp.loadFailed(v, this.getData.bind(this, status))
          if (status === DataStatusEnum.Content) {
            if (v.code === ErrorCode.Empty) {
              if (this.type !== GetMessageTypeEnum.Notify) this.loadErrorTipCmp.showError('园区正常,无异常消息', this.getData.bind(this, status), './assets/imgs/img_alarm_empty.png')
              else this.loadErrorTipCmp.showError('还没有收到过消息哦', this.getData.bind(this, status), ImgErrorEmpty)
            }
          }
          this.cdr.detectChanges()
        }
      )
  }

  trackById(index: number, v: any) {
    return v.id
  }

  private obsData() {
    //通过通知栏将消息标记为已读
    this.messageProvider.messageMarkReadEvent
      .pipe(debounceTime(500))
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          if (this.data) {
            let index = this.data.findIndex((vv) => v.id === vv.id)
            if (index > -1) {
              this.data[index] = Object.assign(new BaseMessageRE(), this.data[index], {isRead: true})
              this.cdr.detectChanges()
            }
          }
        }
      )

    //消息改变  ,  收到通知 , 全部标记为已读
    this.messageProvider.messageChangeEvent
      .pipe(debounceTime(500))
      .bindLifecycle(this)
      .subscribe(
        () => {
          this.getData(DataStatusEnum.Refresh)
        }
      )
  }
}
