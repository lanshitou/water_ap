import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { IrrigateTaskRE } from "../../providers/entity/irrigate/irrigate"

@Component({
  selector: 'irrigate-task-history',
  templateUrl: 'irrigate-task-history.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IrrigateTaskHistoryComponent {
  @Input() data: IrrigateTaskRE
}
