import { Component, HostListener, Injector } from '@angular/core'
import { IonicPage, NavParams, ViewController } from 'ionic-angular'
import { Lsk } from '../../contract/lsk'
import { StorageValue } from '../../extend/ionic/storage'
import { BasePage } from '../../pages/base/base-page'
import { IrrigationTaskDurationConfig } from "./irrigation-task-controller"

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-irrigation-task-duration',
  templateUrl: 'irrigation-task-duration.html',
})
export class IrrigationTaskDurationPage extends BasePage {
  duration: number
  durationEv = new StorageValue<number>(Lsk.LastIrrigationTaskDuration, 1)
  private config: IrrigationTaskDurationConfig

  constructor(protected injector: Injector, public viewCtrl: ViewController, public navParams: NavParams) {
    super(injector)
  }

  onCreate() {
    this.config = this.navParams.get('config')
    this.durationEv.isSync().toPromise().then(() => this.duration = this.durationEv.value.valueOf())
  }

  onSelectDurationClick() {
    if (this.config.onSetDuration) this.config.onSetDuration(this.duration * 60)
    this.durationEv.value = this.duration
    this.viewCtrl.dismiss()
  }

  @HostListener('click')
  backdrop() {
    this.viewCtrl.dismiss()
  }
}

