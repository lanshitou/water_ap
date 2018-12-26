import { Component, HostListener, Injector, Input } from '@angular/core'
import { NavController } from "ionic-angular"
import { BaseComponent } from "../../../../components/base/base-component"
import { CameraPreviewRE } from "../../../../providers/system/entity/preview"
import { CameraListPage } from "../../../camera-list/camera-list"

@Component({
  selector: 'camera-preview',
  templateUrl: 'camera-preview.html'
})
export class CameraPreviewComponent extends BaseComponent {
  @Input() data: CameraPreviewRE

  constructor(protected injector: Injector, public navCtrl: NavController) {
    super(injector)
  }

  @HostListener('click')
  onClick() {
    this.navCtrl.push('CameraListPage', this.data)
  }
}
