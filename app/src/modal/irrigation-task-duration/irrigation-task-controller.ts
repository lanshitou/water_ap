import { Injectable } from '@angular/core'
import { ModalController, ModalOptions } from 'ionic-angular'

@Injectable()
export class IrrigationTaskController {

  constructor(public modal: ModalController) {
  }

  present(config: IrrigationTaskDurationConfig, option?: ModalOptions) {
    let modal = this.modal.create('IrrigationTaskDurationPage', {config: config},
      {enableBackdropDismiss: false, showBackdrop: false, ...option})
    modal.present({keyboardClose: false})
  }
}

export class IrrigationTaskDurationConfig {
  onSetDuration: (number) => void

  constructor(onSetDuration: (number) => void) {
    this.onSetDuration = onSetDuration
  }
}
