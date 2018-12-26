import { Component, Input } from '@angular/core'
import { IrrigateTaskRE } from "../../providers/entity/irrigate/irrigate"

@Component({
  selector: 'irrigate-task-history-simple',
  templateUrl: 'irrigate-task-history-simple.html'
})
export class IrrigateTaskHistorySimpleComponent {
  @Input() data: IrrigateTaskRE
}
