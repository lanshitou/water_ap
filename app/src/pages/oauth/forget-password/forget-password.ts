import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Copyright } from '../../../contract/about'
import { ErrorCode } from '../../../contract/error-code'
import { ToastControllerExProvider } from '../../../providers/toast-control-ex/toast-controler-ex'
import { VerifyCodeTypeEnum } from "../../../providers/user/entity/verify-code-type"
import { UserProvider } from '../../../providers/user/user'
import { OauthBasePage } from '../oauth-base-page'

@IonicPage({defaultHistory: ['LoginInPage']})
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage extends OauthBasePage {
  copyright: string
  tel: string

  constructor(public injector: Injector, public navCtrl: NavController, public navParams: NavParams,
              public userProvider: UserProvider, public toastCtrl: ToastControllerExProvider) {
    super(injector)
    this.copyright = Copyright
    this.tel = navParams.data
    if (!this.tel || typeof this.tel === 'object') this.tel = ''
  }

  onSubmit() {
    this.userProvider.getVcode(this.tel, VerifyCodeTypeEnum.ForgetPassword)
      .loadingOperate()
      .subscribe(
        (v) => {
          this.navCtrl.push('ForgetPasswordDetailPage', this.tel)
        },
        (v) => {
          if (v.code === ErrorCode.ALREADY_SEND_VCODE) {
            this.navCtrl.push('ForgetPasswordDetailPage', this.tel)
          }
          else {
            this.toastCtrl.show({
              message: v.message
            })
          }
        }
      )
  }

  onPop() {
    this.navCtrl.pop()
  }

}
