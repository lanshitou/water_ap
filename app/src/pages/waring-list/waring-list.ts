import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { WaringTypeEnum } from "../../providers/entity/waring/waring-enum"
import { BasePage } from "../base/base-page"

@IonicPage()
@Component({
  selector: 'page-waring-list',
  templateUrl: 'waring-list.html',
})
export class WaringListPage extends BasePage {
  selectSegment: number = 1
  waringType: WaringTypeEnum

  constructor(protected injector: Injector, public navCtrl: NavController, public navParams: NavParams) {
    super(injector)
    this.waringType = this.navParams.data
  }
}
