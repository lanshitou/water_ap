import { Injectable } from '@angular/core'
import { NavOptions, ToastController, ToastOptions } from 'ionic-angular'

/*
  Generated class for the ToastControllerExProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastControllerExProvider {
  constructor(public toastControl: ToastController) {
  }

  show(option?: ToastOptions, navOption?: NavOptions) {
    this.toastControl.create({
      duration: 3000,
      showCloseButton: true,
      closeButtonText: '关闭',
      dismissOnPageChange: true, ...option
    }).present(navOption)
  }

}
