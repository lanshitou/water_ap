import { Injectable } from '@angular/core'
import { ModalController, ModalOptions } from 'ionic-angular'
import { DeviceRE } from "../../providers/entity/device/device"

@Injectable()
export class DeviceOperateController {

  constructor(public modal: ModalController) {
  }

  present(config: DeviceOperateConfig, option?: ModalOptions) {
    let modal = this.modal.create('DeviceOperatePage', {config: config},
      {enableBackdropDismiss: false, showBackdrop: false, ...option})
    modal.present({keyboardClose: false})
  }
}

export class DeviceOperateConfig {
  constructor(public device: DeviceRE, public onOperateSucceed: (v: DeviceRE) => void) {
  }
}
