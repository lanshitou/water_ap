import { Component, Injector, Renderer2 } from '@angular/core'
import { ScreenOrientation } from '@ionic-native/screen-orientation'
import { SplashScreen } from '@ionic-native/splash-screen'
import { JPush } from '@jiguang-ionic/jpush'

import { Config, Platform } from 'ionic-angular'
import { JsonConvert } from 'json2typescript'
import { of } from 'rxjs/observable/of'
import { catchError, debounceTime, switchMap } from 'rxjs/operators'
import { changeServerUrl } from "../contract/url"
import { bounceScrollBlock } from "../extend/ionic/bounce-scroll-block"
import { isCordova, isIOS } from "../extend/ionic/isPlatform"
import { storageInit } from '../extend/ionic/storage'
import { LocalConfigProvider } from '../providers/local-config/local-config'
import { NotifyMessageRE } from '../providers/message/entity/message'
import { MessagePreviewWarpRE } from '../providers/message/entity/message-preview'
import { MessageProvider } from '../providers/message/message'
import { SystemProvider } from '../providers/system/system'
import { ToastControllerExProvider } from '../providers/toast-control-ex/toast-controler-ex'
import { TokenManageProvider } from '../providers/token/token-manage'
import { UserOauthRE } from '../providers/user/entity/user-oauth'
import { GPageTransition } from '../transition/page-transition'

@Component({
  template: `
    <ion-tabs *ngIf="loadingDone">
      <ion-tab tabUrlPath="homeRoot" tabTitle="资讯" tabIcon="home" root="HomePage"></ion-tab>
      <ion-tab tabUrlPath="iasRoot" tabTitle="园区" tabIcon="leaf" root="IasPage"></ion-tab>
      <ion-tab tabUrlPath="messageRoot" tabTitle="消息" tabIcon="notifications" tabBadgeStyle="danger"
               [tabBadge]="messageProvider.unReadMessageCount > 0 ? (messageProvider.unReadMessageCount > 9 ? '9+' : messageProvider.unReadMessageCount) : ''"
               root="MessagePage"></ion-tab>
      <ion-tab tabUrlPath="myRoot" tabTitle="我的" tabIcon="person" root="MyPage"></ion-tab>
    </ion-tabs>
  `
})
export class MyApp {
  loadingDone: boolean = false
  sequence: number = 0
  jpushHasInit = false

  messageProvider: MessageProvider
  systemProvider: SystemProvider
  localConfig: LocalConfigProvider

  constructor(config: Config, inject: Injector, splashScreen: SplashScreen, rend2: Renderer2, screenOrientation: ScreenOrientation,
              public jPush: JPush, public platform: Platform, public toastProvider: ToastControllerExProvider) {
    ServerInject = inject
    if (isIOS()) bounceScrollBlock()

    config.setTransition('ios-transition', GPageTransition)
    config.setTransition('md-transition', GPageTransition)

    platform.ready().then(() => {
      screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT).catch(() => {
      })
      setTimeout(() => {
        splashScreen.hide()
      }, 1200)
    })

    platform.registerListener(window, 'keyboardWillShow', (v) => {
      let keyboardHeight = v['keyboardHeight']
      let appEle = document.querySelector('ion-app')
      rend2.setStyle(appEle, 'height', `calc(100% - ${keyboardHeight}px)`)
      rend2.setAttribute(appEle, 'keyborder', keyboardHeight.toLocaleString())
    }, {capture: true, passive: true, zone: false})

    platform.registerListener(window, 'keyboardWillHide', () => {
      let appEle = document.querySelector('ion-app')
      rend2.removeStyle(appEle, 'height')
      rend2.removeAttribute(appEle, 'keyborder')
    }, {capture: true, passive: true, zone: false})

    this.init()
  }

  private async init() {
    await storageInit()

    this.localConfig = ServerInject.get(LocalConfigProvider)
    if (this.localConfig.serverUrl.value) changeServerUrl(this.localConfig.serverUrl.value)

    this.messageProvider = ServerInject.get(MessageProvider)
    this.systemProvider = ServerInject.get(SystemProvider)

    this.loadingDone = true

    this.jPushInit()

    TokenManageProvider.ev.changeEvent
      .subscribe((v: UserOauthRE) => {
        if (!v) {
          this.messageProvider.messagePreviewEv.value = undefined
          this.systemProvider.checkedSystem(undefined)
          SystemProvider.systemList = undefined

          if (this.jpushHasInit) {
            this.jPush.deleteAlias({sequence: this.sequence++})
            this.jPush.clearAllNotification()
            this.jPush.clearLocalNotifications()
          }
        } else {
          this.messageProvider.messageChangeEvent.emit()
          if (this.jpushHasInit) this.jPush.setAlias({sequence: this.sequence++, alias: String(v.uid)})
        }
      })

    this.tabBadge()
  }

  private tabBadge() {
    this.messageProvider.messagePreviewEv.changeEvent.subscribe(
      (v: MessagePreviewWarpRE | undefined) => {
        if (v) {
          this.messageProvider.unReadMessageCount = v.notify.unreadCount + v.offline.unreadCount + v.irrigate.unreadCount + v.alarm.unreadCount
        } else {
          this.messageProvider.unReadMessageCount = 0
        }
      }
    )

    this.messageProvider.messageChangeEvent
      .pipe(
        debounceTime(500),
        switchMap(() => this.messageProvider.getMessagePreview().pipe(catchError(() => of(undefined)))))
      .subscribe(
        (v) => {
          this.messageProvider.messagePreviewEv.value = v
        }
      )

    this.messageProvider.messageChangeEvent.emit()
  }

  private async jPushInit() {
    if (!isCordova()) return

    await this.localConfig.receiveMessageEv.isSync().toPromise()

    this.jPush.setDebugMode(true)
    this.jPush.init()
    this.jpushHasInit = true

    this.localConfig.receiveMessageEv.notifyAgain()
    this.localConfig.receiveMessageEv.changeEvent
      .subscribe((v) => {
        if (v) this.jPush.resumePush()
        else this.jPush.stopPush()
      })

    //点击通知内容
    this.platform.registerListener(document, 'jpush.openNotification', (v: any) => {
      let jsonConvert = new JsonConvert()
      let json = v['ext']

      let message = jsonConvert.deserialize(JSON.parse(json), NotifyMessageRE) as NotifyMessageRE
      this.messageProvider.getMessageDetail(message)
        .loadingOperate()
        .subscribe(
          () => {
            this.messageProvider.messageMarkReadEvent.emit(message)
            this.messageProvider.actionByType(message)
          },
          (v) => {
            this.toastProvider.show({message: v.message})
          }
        )
    }, {zone: false, capture: true, passive: true})

    //收到通知
    this.platform.registerListener(document, 'jpush.receiveNotification', () => {
      this.messageProvider.messageChangeEvent.emit()
    }, {zone: false, capture: true, passive: true})

    //设置别名,延迟到页面加载完成后
    setTimeout(() => {
      if (TokenManageProvider.ev.value) {
        this.jPush.setAlias({
          sequence: this.sequence++,
          alias: String(TokenManageProvider.ev.value.uid)
        })
      }
    }, 3000)
  }
}

export let ServerInject: Injector
