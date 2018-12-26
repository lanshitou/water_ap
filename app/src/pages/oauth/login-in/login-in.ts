import { Component, Injector } from '@angular/core'
import { ActionSheetController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular'
import { Copyright } from '../../../contract/about'
import { Lsk } from '../../../contract/lsk'
import { considerExitApp } from "../../../extend/ionic/exit-app"
import { StorageValue } from '../../../extend/ionic/storage'
import { ToastControllerExProvider } from '../../../providers/toast-control-ex/toast-controler-ex'
import { TokenManageProvider } from '../../../providers/token/token-manage'
import { UserOauthRE } from '../../../providers/user/entity/user-oauth'
import { UserProvider } from '../../../providers/user/user'
import { OauthBasePage } from '../oauth-base-page'

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-login-in',
  templateUrl: 'login-in.html',
})
export class LoginInPage extends OauthBasePage {
  copyright: string

  tel: string
  password: string
  tempCanLeave: boolean = false
  passwordVisible = false
  lastLoginTelEv = new StorageValue<string>(Lsk.LastLoginTel, undefined)
  isDev = false
  clickCount = 0

  constructor(public injector: Injector, public navCtrl: NavController, public navParams: NavParams,
              public userProvider: UserProvider, public toastCtrl: ToastControllerExProvider,
              public actionCtrl: ActionSheetController) {
    super(injector)
    this.copyright = Copyright
    this.lastLoginTelEv.isSync().toPromise().then(() => {
      this.tel = this.lastLoginTelEv.value ? this.lastLoginTelEv.value : ''
    })
  }

  onSubmit() {
    this.lastLoginTelEv.value = this.tel
    this.userProvider.login(this.tel, this.password)
      .loadingOperate({content: '登录中...'})
      .subscribe(
        (v) => {
          TokenManageProvider.saveUserOauth(v)
        },
        (v) => {
          this.toastCtrl.show({
            message: v.message,
          })
        }
      )
  }

  onHelp() {
    this.actionCtrl.create({
      title: '帮助',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: '联系客服',
          icon: 'call',
          handler: () => {
            this.tempCanLeave = true
            this.navCtrl.push('HelpPage')
          }
        },
        {
          text: '忘记密码',
          icon: 'sad',
          handler: () => {
            this.tempCanLeave = true
            this.navCtrl.push('ForgetPasswordPage', this.tel)
          }
        },
        {
          text: '取消',
          icon: 'close'
        }
      ]
    }).present()
  }

  onLocationClick() {
    this.tempCanLeave = true
    this.navCtrl.push('ServerUrlPage', this.tel)
  }

  onEnter() {
    this.tempCanLeave = false
  }

  canLeave() {
    return this.tempCanLeave || !!TokenManageProvider.ev.value
  }

  onOauthStateChange(entity: UserOauthRE | undefined): void {
    if (entity) this.navCtrl.popToRoot()
  }

  canBackButton() {
    if (considerExitApp()) this.injector.get(Platform).exitApp()
    return false
  }

  becomeDevClick() {
    if (this.isDev) return
    this.clickCount++
    if (this.clickCount === 7) {
      this.toastCtrl.show({message: '再连击3次成为开发者'})
    }
    if (this.clickCount >= 10) {
      this.isDev = true
      this.toastCtrl.show({message: '您已成为开发者'})
    }
  }
}
