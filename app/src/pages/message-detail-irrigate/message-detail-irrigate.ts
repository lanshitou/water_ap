import { Component, Injector } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { JsonConvert } from "json2typescript"
import { e } from "../../extend/log"
import { LoadingStatusEnum } from "../../modal/loading-page/load-status-anime/load-status-anime"
import { LoadingPageConfig, LoadingPageController } from "../../modal/loading-page/loading-page-controller"
import { IrrigateTaskRE } from "../../providers/entity/irrigate/irrigate"
import { NotifyMessageRE } from "../../providers/message/entity/message"
import { WaringRE } from "../../providers/waring/entity/waring"
import { WaringProvider } from "../../providers/waring/waring"
import { BasePage } from "../base/base-page"

@IonicPage()
@Component({
  selector: 'page-message-detail-irrigate',
  templateUrl: 'message-detail-irrigate.html',
})
export class MessageDetailIrrigatePage extends BasePage {
  message: NotifyMessageRE
  ext: WaringRE
  task: IrrigateTaskRE

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public waringProvider: WaringProvider, public loadingPageCtrl: LoadingPageController) {
    super(injector)

    try {
      let jsonConvert = new JsonConvert()
      if (this.navParams.data.ext) {
        this.ext = jsonConvert.deserialize(this.navParams.data.ext, WaringRE)
        if (!(this.ext.ext instanceof IrrigateTaskRE)) this.ext.ext = jsonConvert.deserialize(this.ext.ext, IrrigateTaskRE)
      }
      if (this.navParams.data.message) {
        this.message = this.navParams.data.message
        this.task = jsonConvert.deserialize(this.navParams.data.message.extension, IrrigateTaskRE)
      }
    } catch (v) {
      e(v)
    }
  }

  onClearClick() {
    let loadingPageConfig = new LoadingPageConfig()
    this.loadingPageCtrl.present(loadingPageConfig).then(() => {
      this.waringProvider.markWaringClear(this.ext.id)
        .bindLifecycle(this)
        .subscribe(
          (v) => {
            this.ext = v
            try {
              let jsonConvert = new JsonConvert()
              this.ext.ext = jsonConvert.deserialize(this.ext.ext, IrrigateTaskRE)
            } catch (v) {
              e(v)
            }
            if (this.message) this.message.extension = this.ext
            loadingPageConfig.change(LoadingStatusEnum.Succeed, '清除告警成功')
          },
          (v) => {
            loadingPageConfig.change(LoadingStatusEnum.Failed, '清除告警失败 : ' + v.message)
          }
        )
    })
  }
}
