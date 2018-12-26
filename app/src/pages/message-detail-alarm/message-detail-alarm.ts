import { Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { JsonConvert } from "json2typescript"
import { e } from "../../extend/log"
import { DcPointProvider } from "../../providers/dc-point/dc-point"
import { DcPointHistoryLE } from "../../providers/dc-point/entity/history"
import { dcPointValueConvertUtil } from "../../providers/entity/dc-point/convert/dc-point-convert"
import { WaringRE } from "../../providers/waring/entity/waring"
import { BasePage } from "../base/base-page"
import { ChartConfigHelp } from "../dc-point-detail/chart-config-help"

@IonicPage()
@Component({
  selector: 'page-message-detail-alarm',
  templateUrl: 'message-detail-alarm.html',
})
export class MessageDetailAlarmPage extends BasePage {
  ext: WaringRE

  chartHelp: ChartConfigHelp = new ChartConfigHelp()
  @ViewChild('chart') chartEle: ElementRef

  data: DcPointHistoryLE[]

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector, public dcPointProvider: DcPointProvider) {
    super(injector)
    try {
      let jsonConvert = new JsonConvert()
      if (this.navParams.data.ext) {
        this.ext = jsonConvert.deserialize(this.navParams.data.ext, WaringRE)
        this.ext.ext.threshold = dcPointValueConvertUtil(this.ext.ext.dataType, this.ext.ext.threshold)
      }
    } catch (v) {
      e(v)
    }
  }

  onCreate() {
    this.chartHelp.createAndConfig(this.ext.ext['dataType'], this.chartEle.nativeElement)
    this.getData()
  }

  private getData() {
    let hour = 60 * 60 * 1000
    let halfDay = hour * 12
    this.loadErrorTipCmp.showLoading()
    this.dcPointProvider.getDcPointHistory(this.ext.ext['sensorId'], this.ext.ext['dataType'], this.ext.produceTime - halfDay, this.ext.produceTime + halfDay, this.ext.addr.iasId)
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.data = v
          this.chartHelp.rendData(v)
          this.loadErrorTipCmp.showContent()
        },
        (v) => {
          this.loadErrorTipCmp.showError(v, this.getData.bind(this))
        }
      )
  }
}
