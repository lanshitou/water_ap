import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { WaringStatisticRE } from "../../providers/entity/waring/waring-statistic"

@Component({
  selector: 'waring-statistic',
  templateUrl: 'waring-statistic.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaringStatisticComponent {
  @Input() data: WaringStatisticRE
}
