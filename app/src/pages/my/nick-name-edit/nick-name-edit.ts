import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ToastControllerExProvider } from '../../../providers/toast-control-ex/toast-controler-ex'
import { UserInfoRE } from '../../../providers/user/entity/user-info'
import { UserProvider } from '../../../providers/user/user'
import { BasePage } from '../../base/base-page'

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-nick-name-edit',
  templateUrl: 'nick-name-edit.html',
})
export class NickNameEditPage extends BasePage {
  data: UserInfoRE
  nickName: string

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public userProvider: UserProvider, public toastCtrl: ToastControllerExProvider) {
    super(injector)
    this.data = this.navParams.data
  }

  onSubmit() {
    this.userProvider.updateUserInfo({nickName: this.nickName})
      .loadingOperate()
      .subscribe(
        () => {
          this.data.nickName = this.nickName
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
