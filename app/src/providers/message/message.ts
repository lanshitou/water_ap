import { HttpParams } from "@angular/common/http"
import { EventEmitter, Injectable } from '@angular/core'
import { InAppBrowser } from '@ionic-native/in-app-browser'
import { JPush } from '@jiguang-ionic/jpush'
import { App } from "ionic-angular"
import { Any } from 'json2typescript'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { map } from 'rxjs/operators'
import { ServerInject } from "../../app/app.component"
import { Lsk } from '../../contract/lsk'
import { ServerUrl } from '../../contract/url'
import '../../extend/api-operate'
import { StorageValue } from '../../extend/ionic/storage'
import { Api } from '../base/api'
import { ToastControllerExProvider } from "../toast-control-ex/toast-controler-ex"
import { BaseMessageRE, ImportantMessageRE, NotifyMessageRE } from './entity/message'
import { MessageIasUnreadRE } from "./entity/message-ias-unread"
import { MessagePreviewWarpRE } from './entity/message-preview'
import { GetMessageTypeEnum, MessageTypeEnum } from './entity/message-type'

@Injectable()
export class MessageProvider extends Api {
  test = Math.random() * 10
  messageChangeEvent = new EventEmitter<undefined>() //消息变化
  messageMarkReadEvent = new EventEmitter<NotifyMessageRE>() //点击系统通知后将消息标记为已读事件
  //本地存储 和 可观测对象的结合
  messagePreviewEv = new StorageValue<MessagePreviewWarpRE>(Lsk.MessagePreview, undefined, false, MessagePreviewWarpRE)

  private _unReadMessageCount = 0 //未读消息数

  get unReadMessageCount(): number {
    return this._unReadMessageCount
  }

  set unReadMessageCount(value: number) {
    this._unReadMessageCount = value
    this.jPush.setBadge(value)
    this.jPush.setApplicationIconBadgeNumber(value)
  }

  constructor(public inAppBrowser: InAppBrowser, public jPush: JPush) {
    super()
  }

  //获取消息预览内容
  getMessagePreview() {
    return this.http.get(`${ServerUrl}/messages/preview`)
      .apiOperate<MessagePreviewWarpRE>(MessagePreviewWarpRE)
  }

  //获取消息列表
  getMessageList(type: GetMessageTypeEnum, offset: number, limit: number, iasId: number): Observable<BaseMessageRE[]> {
    return this.http.get(`${ServerUrl}/messages/categories/${type}`,
      {
        params: {
          offset: offset.toString(),
          limit: limit.toString(),
          iasId: iasId.toString()
        }
      })
      .apiOperate<BaseMessageRE[]>(BaseMessageRE)
  }

  //获取消息内容
  getMessageDetail(data: NotifyMessageRE): Observable<NotifyMessageRE> {
    if (data.extension) {
      return of(data)
    }
    else {
      return this.http.get(`${ServerUrl}/messages/${data.id}`)
        .apiOperate<any>(Any)
        .pipe(
          map((v) => {
            //标记已读
            if (data instanceof BaseMessageRE) data.isRead = true
            this.unReadMessageCount--
            //添加拓展
            data.extension = v
            return data
          })
        )
    }
  }

  //获取一个类型的消息未读数量
  getMessageTypeUnread(type: GetMessageTypeEnum) {
    return this.http.get(`${ServerUrl}/messages/categories/${type}/unread`)
      .apiOperate<MessageIasUnreadRE[]>(MessageIasUnreadRE)
  }

  //将该类型下的消息标记为已读
  getMessageTypeMarkRead(type: GetMessageTypeEnum, iasId: number) {
    let params = new HttpParams().append('iasId', iasId.toString())
    return this.http.post(`${ServerUrl}/messages/categories/${type}/markAllRead`, params)
      .apiOperate<undefined>(undefined)
  }

  //获取重要通知内容
  getImportantMessage() {
    return this.http.get(`${ServerUrl}/notifications`)
      .apiOperate<ImportantMessageRE[]>(ImportantMessageRE)
  }

  //将重要通知标记为已读
  markImportantMessageRead(articleId: number) {
    return this.http.post(`${ServerUrl}/notifications/${articleId}/read`, {})
      .apiOperate<undefined>(undefined)
  }

  actionByType(message: NotifyMessageRE) {
    switch (message.type) {
      case MessageTypeEnum.ThresholdWarningCleared:
      case MessageTypeEnum.ThresholdWarningProduced:
        ServerInject.get(App).getActiveNav().push('MessageDetailAlarmPage', {ext: message.extension})
        break
      case MessageTypeEnum.DeviceOnline:
      case MessageTypeEnum.DeviceOffline:
        ServerInject.get(App).getActiveNav().push('MessageDetailOfflinePage', {ext: message.extension})
        break
      case MessageTypeEnum.Irrigation:
        ServerInject.get(App).getActiveNav().push('MessageDetailIrrigatePage', {message: message})
        break
      case MessageTypeEnum.IrrigationFail:
        ServerInject.get(App).getActiveNav().push('MessageDetailIrrigatePage', {
          message: message,
          ext: message.extension
        })
        break
      case MessageTypeEnum.NotifyArticle:
        ServerInject.get(App).getActiveNav().push('ArticlePage', message.extension.id)
        break
      default:
        let toastControllerExProvider = ServerInject.get(ToastControllerExProvider)
        toastControllerExProvider.show({message: `未知消息类型 : ${message.type}`})
        break
    }
    //清除通知栏
    if (message instanceof BaseMessageRE && message.msgId) this.jPush.clearNotificationById(message.msgId)
  }
}
