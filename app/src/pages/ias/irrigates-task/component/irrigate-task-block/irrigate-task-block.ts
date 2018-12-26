import { Component, EventEmitter, HostListener, Injector, Input, Output } from '@angular/core'
import { BaseComponent } from '../../../../../components/base/base-component'
import { IrrigateRLE } from '../../../../../providers/irrigate/entity/task-irrigates'

@Component({
  selector: 'irrigate-task-block',
  templateUrl: 'irrigate-task-block.html',
  host: {
    '[class.disable]': '!data.enable'
  }
})
export class IrrigateTaskBlockComponent extends BaseComponent {
  @Input() data: IrrigateRLE
  @Output() onTaskSelectChange = new EventEmitter<boolean>()

  constructor(protected injector: Injector) {
    super(injector)
  }

  @HostListener('click')
  onClick() {
    if (!this.data.enable) return
    this.data.selected = !this.data.selected
    this.onTaskSelectChange.emit(this.data.selected)
  }
}
