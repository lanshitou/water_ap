import { Pipe, PipeTransform } from '@angular/core'
import { GetWaringTypeEnum } from "../../providers/entity/waring/waring-enum"

@Pipe({
  name: 'getWaringIcon',
})
export class GetWaringIconPipe implements PipeTransform {
  transform(value: GetWaringTypeEnum, ...args) {
    switch (value) {
      case GetWaringTypeEnum.Alarm :
        return './assets/imgs/waring/img_alarm.png'
      case GetWaringTypeEnum.Irrigate :
        return './assets/imgs/waring/img_irrigate.png'
      case GetWaringTypeEnum.Offline :
        return './assets/imgs/waring/img_offline.png'
      case GetWaringTypeEnum.Other :
        return './assets/imgs/waring/img_other.png'
      default:
        return './assets/imgs/waring/img_other.png'
    }
  }
}
