import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { JsonConvert } from "json2typescript"
import { e } from "../../extend/log"
import { WaringRE } from "../../providers/waring/entity/waring"
import { BasePage } from "../base/base-page"

@IonicPage()
@Component({
  selector: 'page-message-detail-offline',
  templateUrl: 'message-detail-offline.html',
})
export class MessageDetailOfflinePage extends BasePage {
  ext: WaringRE

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector) {
    super(injector)
    try {
      let jsonConvert = new JsonConvert()
      if (this.navParams.data.ext) {
        this.ext = jsonConvert.deserialize(this.navParams.data.ext, WaringRE)
      }
    } catch (v) {
      e(v)
    }
  }
}
