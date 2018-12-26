import { Component, Injector } from '@angular/core'
import { IonicPage, NavController } from 'ionic-angular'
import { UserOauthRE } from '../../providers/user/entity/user-oauth'
import { UserProvider } from '../../providers/user/user'
import { BasePage } from '../base/base-page'

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-agreement',
  templateUrl: 'agreement.html',
})
export class AgreementPage extends BasePage {
  data: string

  constructor(protected injector: Injector, public navCtrl: NavController, public userProvider: UserProvider) {
    super(injector)
  }

  onOauthStateChange(entity: UserOauthRE | undefined): void {
    if (entity) this.getData()
  }

  onCreate() {
    this.getData()
  }

  private getData() {
    this.loadErrorTipCmp.showLoading()
    this.userProvider.getAgreement()
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

}
