import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { BasePage } from '../../base/base-page'

@IonicPage({defaultHistory: ['IasPage']})
@Component({
  selector: 'page-irrigates-task',
  templateUrl: 'irrigates-task.html'
})
export class IrrigatesTaskPage extends BasePage {
  selectSegment: number = 0

  constructor(protected injector: Injector, public navCtrl: NavController, public navParams: NavParams) {
    super(injector)
  }
}
