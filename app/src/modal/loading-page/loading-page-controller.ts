import { Injectable } from '@angular/core'
import { ModalController, ModalOptions } from 'ionic-angular'
import { LoadingStatusEnum } from "./load-status-anime/load-status-anime"

@Injectable()
export class LoadingPageController {

  constructor(public modal: ModalController) {
  }

  present(config: LoadingPageConfig, option?: ModalOptions): Promise<any> {
    let modal = this.modal.create('LoadingPageComponent', {config: config},
      {enableBackdropDismiss: false, showBackdrop: false, ...option})
    return modal.present()
  }
}

export class LoadingPageConfig {
  status: LoadingStatusEnum = LoadingStatusEnum.Loading
  text: string = '努力加载中...'
  tip: string = '当持续高温天气时，记得打开风机为棚区通风哦，不然会憋坏作物的'
  dismissDelay: number = -1
  callBack: (f: LoadingPageConfig) => void

  change(status?: LoadingStatusEnum, text?: string, dismissDelay?: number) {
    if (status) {
      this.status = status
      //默认关闭时间
      this.dismissDelay = status === LoadingStatusEnum.Loading ? -1 : 2500
    }
    if (text) this.text = text
    if (dismissDelay) this.dismissDelay = dismissDelay
    if (this.callBack) this.callBack(this)
  }
}
