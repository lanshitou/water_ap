import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Injector,
  Input,
  Renderer2
} from '@angular/core'
import { Content } from "ionic-angular"
import { DeviceOperateConfig, DeviceOperateController } from "../../modal/device-operate/device-operate-controller"
import { DeviceRE } from '../../providers/entity/device/device'
import { DevBaseComponent } from "../base/dev-base-component"

@Component({
  selector: 'device',
  templateUrl: 'device.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: DevBaseComponent, useExisting: forwardRef(() => DeviceComponent)}
  ]
})
export class DeviceComponent extends DevBaseComponent {
  @Input() data: DeviceRE

  constructor(protected injector: Injector, public deviceOperateCtrl: DeviceOperateController, public cdr: ChangeDetectorRef,
              public parentContent: Content, public rend2: Renderer2, public ele: ElementRef) {
    super(injector, parentContent, rend2, ele)
  }

  @HostListener('click')
  onClick() {
    let config = new DeviceOperateConfig(this.data, (v) => {
      Object.assign(this.data, v)
      this.cdr.detectChanges()
    })
    this.deviceOperateCtrl.present(config)
  }
}
