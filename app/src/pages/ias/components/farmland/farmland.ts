import { ChangeDetectionStrategy, Component, HostListener, Injector, Input } from '@angular/core'
import { NavController } from 'ionic-angular'
import { BaseComponent } from '../../../../components/base/base-component'
import { FarmlandOutlinesRE } from '../../../../providers/system/entity/preview'
import { ModeEnum } from '../../../../providers/system/entity/systems'

@Component({
  selector: 'farmland',
  templateUrl: 'farmland.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FarmlandComponent extends BaseComponent {
  @Input() data: FarmlandOutlinesRE
  @Input() mode: ModeEnum

  constructor(protected injector: Injector, public navCtrl: NavController) {
    super(injector)
  }

  @HostListener('click')
  onClick() {
    this.navCtrl.push('FarmlandPage', this.data.id)
  }
}
