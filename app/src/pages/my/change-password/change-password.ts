import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ToastControllerExProvider } from '../../../providers/toast-control-ex/toast-controler-ex'
import { TokenManageProvider } from '../../../providers/token/token-manage'
import { UserProvider } from '../../../providers/user/user'
import { BasePage } from '../../base/base-page'

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage extends BasePage {
  oldP: string = ''
  newP: string = ''
  newPC: string = ''

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public userProvider: UserProvider, public toastCtrl: ToastControllerExProvider) {
    super(injector)
  }

  onSubmit() {
    if (this.newP !== this.newPC) {
      this.toastCtrl.show({message: '两次输入的密码不一致'})
      return
    }
    this.userProvider.changePassword(this.oldP, this.newP)
      .loadingOperate()
      .subscribe(
        () => {
          TokenManageProvider.cleanUserOauth()
          this.toastCtrl.show({
            message: '请重新登录',
          })
          this.navCtrl.pop()
        },
        (v) => {
          this.toastCtrl.show({
            message: v.message,
          })
        }
      )
  }

}
