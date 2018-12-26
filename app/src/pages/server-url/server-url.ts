import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ServerUrl } from "../../contract/url"
import { LocalConfigProvider } from "../../providers/local-config/local-config"
import { ToastControllerExProvider } from "../../providers/toast-control-ex/toast-controler-ex"
import { BasePage } from "../base/base-page"

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-server-url',
  templateUrl: 'server-url.html',
})
export class ServerUrlPage extends BasePage {
  url: string

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public toastCtrl: ToastControllerExProvider, public  localConfig: LocalConfigProvider) {
    super(injector)
    this.url = ServerUrl
  }

  onSubmit() {
    this.localConfig.serverUrl.value = this.url
    this.toastCtrl.show({message: '请重启程序 , 重启后生效'})
  }

}
