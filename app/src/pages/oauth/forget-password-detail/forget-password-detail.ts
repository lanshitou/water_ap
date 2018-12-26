import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Copyright } from '../../../contract/about'
import { ToastControllerExProvider } from '../../../providers/toast-control-ex/toast-controler-ex'
import { VerifyCodeTypeEnum } from "../../../providers/user/entity/verify-code-type"
import { UserProvider } from '../../../providers/user/user'
import { OauthBasePage } from '../oauth-base-page'

@IonicPage({defaultHistory: ['LoginInPage']})
@Component({
  selector: 'page-forget-password-detail',
  templateUrl: 'forget-password-detail.html',
})
export class ForgetPasswordDetailPage extends OauthBasePage {
  copyright: string

  tel: string
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

  onSubmit() {
    this.userProvider.forgetPassword(this.tel, this.password, this.vcode)
      .loadingOperate()
      .subscribe(
        (v) => {
          this.navCtrl.popTo('LoginInPage')
        },
        (v) => {
          this.toastCtrl.show({message: v.message})
        }
      )
  }

  onResend() {
    this.userProvider.getVcode(this.tel, VerifyCodeTypeEnum.ForgetPassword)
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
