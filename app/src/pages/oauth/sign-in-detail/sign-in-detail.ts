import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Copyright } from '../../../contract/about'
import { ToastControllerExProvider } from '../../../providers/toast-control-ex/toast-controler-ex'
import { TokenManageProvider } from '../../../providers/token/token-manage'
import { UserOauthRE } from '../../../providers/user/entity/user-oauth'
import { VerifyCodeTypeEnum } from "../../../providers/user/entity/verify-code-type"
import { UserProvider } from '../../../providers/user/user'
import { OauthBasePage } from '../oauth-base-page'

@IonicPage({defaultHistory: ['LoginInPage']})
@Component({
  selector: 'page-sign-in-detail',
  templateUrl: 'sign-in-detail.html',
})
export class SignInDetailPage extends OauthBasePage {
  copyright: string

  tel: string
  nickName: string
  vcode: string
  password: string
  passwordVisible = true

  constructor(public injector: Injector, public navCtrl: NavController, public navParams: NavParams,
              public userProvider: UserProvider, public toastCtrl: ToastControllerExProvider) {
    super(injector)
    this.copyright = Copyright
    this.tel = navParams.data
    if (!this.tel || typeof this.tel === 'object') this.tel = ''
  }

  onOauthStateChange(entity: UserOauthRE | undefined): void {
    if (entity) this.navCtrl.popToRoot()
  }

  onSubmit() {
    this.userProvider.register(this.tel, this.password, this.vcode, this.nickName)
      .loadingOperate()
      .subscribe(
        (v) => {
          TokenManageProvider.saveUserOauth(v)
        },
        (v) => {
          this.toastCtrl.show({message: v.message})
        }
      )
  }

  onResend() {
    this.userProvider.getVcode(this.tel, VerifyCodeTypeEnum.SignIn)
      .loadingOperate()
      .subscribe(
        (v) => {
        },
        (v) => {
          this.toastCtrl.show({message: v.message})
        }
      )
  }

  onPop() {
    this.navCtrl.pop()
  }
}
