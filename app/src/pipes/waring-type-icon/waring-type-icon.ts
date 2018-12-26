import { Pipe, PipeTransform } from '@angular/core'
import { WaringTypeEnum } from "../../providers/entity/waring/waring-enum"

@Pipe({
  name: 'waringTypeIcon',
})
export class WaringTypeIconPipe implements PipeTransform {
  transform(value: WaringTypeEnum, ...args) {
    switch (value) {
      case WaringTypeEnum.LowerLimit :
      case WaringTypeEnum.UpperLimit :
        return './assets/imgs/waring/img_alarm.png'
      case WaringTypeEnum.IrrigationFail :
        return './assets/imgs/waring/img_irrigate.png'
      case WaringTypeEnum.DeviceOffline :
        return './assets/imgs/waring/img_offline.png'
      case WaringTypeEnum.None :
        return './assets/imgs/waring/img_other.png'
      default:
        return './assets/imgs/waring/img_other.png'
    }
  }
}
