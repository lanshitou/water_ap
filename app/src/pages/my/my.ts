import { Component, Injector } from '@angular/core'
import { AlertController, IonicPage, NavController } from 'ionic-angular'
import { Version } from '../../contract/about'
import { LocalConfigProvider } from '../../providers/local-config/local-config'
import { TokenManageProvider } from '../../providers/token/token-manage'
import { UserInfoRE } from '../../providers/user/entity/user-info'
import { UserProvider } from '../../providers/user/user'
import { BaseTabPage } from '../base/BaseTabPage'

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage extends BaseTabPage {
  data: UserInfoRE
  version: string

  constructor(public navCtrl: NavController, public configProvider: LocalConfigProvider,
              public userProvider: UserProvider, public alertCtrl: AlertController, protected injector: Injector) {
    super(injector)
    this.version = Version
  }

  onCreate() {
    this.getData()
  }

  getData() {
    this.loadErrorTipCmp.showLoading()
    this.userProvider.getUserInfo()
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.data = v
          this.loadErrorTipCmp.showContent()
        },
        (v) => {
          this.loadErrorTipCmp.showError(v, this.getData.bind(this))
        }
      )
  }

  onCheckUpdateClick() {
    //TODO 版本升级检查
  }

  onLoginOut() {
    this.alertCtrl.create({
      title: '退出登录',
      subTitle: '您即将退出登录,确定要继续吗?',
      enableBackdropDismiss: true,
      buttons: [
        {
          text: '取消'
        },
        {
          text: '确定',
          handler: this.loginOut.bind(this)
        }
      ]
    }).present()
  }

  private loginOut() {
    this.userProvider.loginOut()
      .loadingOperate()
      .subscribe(
        (v) => {
          TokenManageProvider.cleanUserOauth()
        },
        (v) => {
          TokenManageProvider.cleanUserOauth()
        }
      )
  }
}
