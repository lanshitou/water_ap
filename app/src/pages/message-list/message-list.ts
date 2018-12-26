import { Component, ElementRef, Injector, QueryList, ViewChild, ViewChildren } from '@angular/core'
import { AlertController, IonicPage, NavController, NavParams, SegmentButton } from 'ionic-angular'
import { debounceTime } from "rxjs/operators"
import { ScrollYContainerComponent } from "../../components/scroll-y-container/scroll-y-container"
import { DataStatusEnum } from "../../extend/data-help/data-status-enum"
import { calcContentDimensions } from "../../extend/ionic/content"
import { LocalConfigProvider } from "../../providers/local-config/local-config"
import { MessageIasUnreadRE } from "../../providers/message/entity/message-ias-unread"
import { GetMessageTypeEnum } from "../../providers/message/entity/message-type"
import { MessageProvider } from "../../providers/message/message"
import { ToastControllerExProvider } from "../../providers/toast-control-ex/toast-controler-ex"
import { BasePage } from "../base/base-page"

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-message-list',
  templateUrl: 'message-list.html',
})
export class MessageListPage extends BasePage {
  messageType: GetMessageTypeEnum

  checkedSystemId: number
  systemDataList: MessageIasUnreadRE[] = []

  @ViewChildren(SegmentButton, {read: ElementRef}) segmentButtonEles: QueryList<ElementRef>
  @ViewChild(ScrollYContainerComponent) syCmp: ScrollYContainerComponent

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public messageProvider: MessageProvider, public alertCtrl: AlertController, public  toastCtrl: ToastControllerExProvider,
              public localConfig: LocalConfigProvider) {
    super(injector)
    this.messageType = navParams.data
  }

  onCreate() {
    this.obsData()
    this.getData(DataStatusEnum.Content)
  }

  onEnter() {
    this.getData(DataStatusEnum.Refresh)
  }

  allMarkRead() {
    this.alertCtrl.create({
      title: '全部已读',
      subTitle: '确定要将全部消息标记为已读吗?',
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: () => {
            this.messageProvider.getMessageTypeMarkRead(this.messageType, this.checkedSystemId)
              .bindLifecycle(this)
              .subscribe(
                () => {
                  this.systemDataList.find((v) => v.id === this.checkedSystemId).count = 0
                  this.messageProvider.messageChangeEvent.emit()
                },
                () => {
                  this.toastCtrl.show({message: '标记全部已读失败,请稍后重试!'})
                }
              )
          }
        }
      ]
    }).present()
  }

  trackById(index: number, v: any) {
    return v.id
  }

  scrollToPosition() {
    if (this.segmentButtonEles && this.syCmp) {
      let index = this.systemDataList.findIndex((v) => this.checkedSystemId === v.id)
      let button = this.segmentButtonEles.find((_, i) => i === index).nativeElement as HTMLElement
      this.syCmp.scrollToEle(button)
    }
  }

  private getData(status: DataStatusEnum) {
    //这个类型不需要 获取系统信息
    if (this.messageType === GetMessageTypeEnum.Notify) {
      this.checkedSystemId = -1
      this.systemDataList = []
      let systemUnread = new MessageIasUnreadRE()
      systemUnread.id = -1
      systemUnread.count = 0
      systemUnread.name = ''
      this.systemDataList.push(systemUnread)
      this.loadErrorTipCmp.showContent()
      calcContentDimensions(this.contentCmp)
    }
    else {
      if (status === DataStatusEnum.Content) this.loadErrorTipCmp.showLoading()
      this.messageProvider.getMessageTypeUnread(this.messageType)
        .bindLifecycle(this)
        .subscribe(
          (v) => {
            this.systemDataList = v

            //没有选过那么用默认的
            if (this.checkedSystemId === undefined) {
              //优先用默认选择的系统 其次第一个
              let filter = v.filter((i) => this.localConfig.lastSelectSystemEv.value === i.id)
              this.checkedSystemId = this.checkedSystemId ? this.checkedSystemId : filter.length > 0 ? filter[0].id : v[0].id

              //让Y轴滚动到合适的位置
              setTimeout(() => {
                this.scrollToPosition()
              })
            }

            this.loadErrorTipCmp.showContent()
            calcContentDimensions(this.contentCmp)
          },
          (v) => {
            this.loadErrorTipCmp.showError(v, this.getData.bind(this, status))
          }
        )
    }
  }

  private obsData() {
    //通过通知栏将消息标记为已读
    this.messageProvider.messageMarkReadEvent
      .pipe(debounceTime(500))
      .bindLifecycle(this)
      .subscribe(
        () => {
          this.getData(DataStatusEnum.Refresh)
        }
      )
  }
}
