import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ToastControllerExProvider } from "../../../providers/toast-control-ex/toast-controler-ex"
import { UserInfoRE } from "../../../providers/user/entity/user-info"
import { VerifyCodeTypeEnum } from "../../../providers/user/entity/verify-code-type"
import { UserProvider } from "../../../providers/user/user"
import { BasePage } from '../../base/base-page'

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-tel-change',
  templateUrl: 'tel-change.html',
})
export class TelChangePage extends BasePage {
  data: UserInfoRE

  vcode: string
  password: string
  tel: string

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public userProvider: UserProvider, public toastCtrl: ToastControllerExProvider) {
    super(injector)
    this.data = this.navParams.data
  }

  getVcode() {
    this.userProvider.getVcode(this.tel, VerifyCodeTypeEnum.ChangeTel)
      .loadingOperate()
      .subscribe(
        (v) => {
        },
        (v) => {
          this.toastCtrl.show({message: v.message})
        }
      )
  }

  omSubmit() {
    this.userProvider.changeTel(this.tel, this.vcode, this.password)
      .loadingOperate()
      .subscribe(
        (v) => {
          Object.assign(this.data, v)
          this.navCtrl.pop()
        },
        (v) => {
          this.toastCtrl.show({message: v.message})
        }
      )

  }
}
