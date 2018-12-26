import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Injector, Input, Renderer2 } from '@angular/core'
import { Content } from "ionic-angular"
import { DeviceRE } from "../../providers/entity/device/device"
import { DevBaseComponent } from "../base/dev-base-component"

@Component({
  selector: 'device-group',
  templateUrl: 'device-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: DevBaseComponent, useExisting: forwardRef(() => DeviceGroupComponent)}
  ]
})
export class DeviceGroupComponent extends DevBaseComponent {
  @Input() data: DeviceRE[] = []

  constructor(protected injector: Injector, public rend2: Renderer2,
              public parentContent: Content, public ele: ElementRef) {
    super(injector, parentContent, rend2, ele)
  }

  trackById(index: number, item: any) {
    return item.id
  }
}
