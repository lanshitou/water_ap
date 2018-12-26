import { Component, ElementRef, forwardRef, Injector, Input, Renderer2 } from '@angular/core'
import { Content } from "ionic-angular"
import { DevBaseComponent } from "../../../../../components/base/dev-base-component"
import { IrrigateRE } from "../../../../../providers/entity/irrigate/irrigate"

@Component({
  selector: 'shake-irrigate',
  templateUrl: 'shake-irrigate.html',
  providers: [
    {provide: DevBaseComponent, useExisting: forwardRef(() => ShakeIrrigateComponent)}
  ]
})
export class ShakeIrrigateComponent extends DevBaseComponent {
  @Input() data: IrrigateRE

  constructor(protected injector: Injector, public parentContent: Content, public rend2: Renderer2, public ele: ElementRef) {
    super(injector, parentContent, rend2, ele)
  }
}
