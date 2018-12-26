import { Component, Injector } from '@angular/core'
import { IonicPage } from 'ionic-angular'
import { DataLoadHelp } from "../../extend/data-help/data-load-help"
import { DataStatusEnum } from "../../extend/data-help/data-status-enum"
import { MessagePreviewWarpRE } from '../../providers/message/entity/message-preview'
import { MessageProvider } from '../../providers/message/message'
import { BaseTabPage } from '../base/BaseTabPage'

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage extends BaseTabPage {
  data: MessagePreviewWarpRE
  dataLoadHelp: DataLoadHelp

  constructor(protected injector: Injector, public messageProvider: MessageProvider) {
    super(injector)
  }

  onCreate() {
    this.dataLoadHelp = new DataLoadHelp(this.loadErrorTipCmp, this.pullRefreshCmp)
    this.obsData()
    this.getData(DataStatusEnum.Content)
  }

  onEnter() {
    this.getData(DataStatusEnum.Refresh)
  }

  getData(status: DataStatusEnum) {
    if (!this.dataLoadHelp.canLoad(status)) return
    if (status === DataStatusEnum.Content) {
      if (this.messageProvider.messagePreviewEv.value) {
        this.data = this.messageProvider.messagePreviewEv.value
        this.dataLoadHelp.loadSucceed()
      }
    } else {
      this.messageProvider.messageChangeEvent.emit()
    }
  }

  private obsData() {
    this.messageProvider.messagePreviewEv.changeEvent
      .bindLifecycle(this)
      .subscribe(
        (v: MessagePreviewWarpRE | undefined) => {
          if (v) {
            this.data = v
            this.dataLoadHelp.loadSucceed()
          }
          else if (!this.data) {
            this.dataLoadHelp.loadFailed('获取消息失败', () => {
              this.messageProvider.messageChangeEvent.emit()
            })
          }
        }
      )
  }
}
