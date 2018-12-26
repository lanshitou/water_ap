import { Component, Input } from '@angular/core'
import { NavController, Tabs } from "ionic-angular"
import { DeviceProvider } from "../../providers/device/device"
import { DevAddressRE } from "../../providers/entity/dev-address/dev-address"
import { SystemProvider } from "../../providers/system/system"

@Component({
  selector: 'device-location',
  templateUrl: 'device-location.html'
})
export class DeviceLocationComponent {
  @Input() data: DevAddressRE
  @Input() type: number
  @Input() isIrrigate: boolean

  constructor(public deviceProvider: DeviceProvider, public tabProvider: Tabs, public navCtrl: NavController,
              public systemProvider: SystemProvider) {
  }

  navTo() {
    let isOnFarmLand = this.data.farmlandId !== undefined
    if (this.isIrrigate) {
      this.deviceProvider.sharkIrrigateId = this.data.areaId
    }
    else {
      this.deviceProvider.sharkDeviceId = this.data.devId
      this.deviceProvider.sharkDeviceType = this.type
    }


    this.navCtrl.popToRoot({animate: !isOnFarmLand}, () => {
      this.systemProvider.checkedSystem(this.data.iasId)
      this.tabProvider.select(1, {animate: false})
      if (isOnFarmLand) this.navCtrl.push('FarmlandPage', this.data.farmlandId)
    })
  }
}
