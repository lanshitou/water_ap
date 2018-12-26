import { Pipe, PipeTransform } from '@angular/core'
import { GetWaringTypeEnum } from "../../providers/entity/waring/waring-enum"

@Pipe({
  name: 'getWaringType',
})
export class GetWaringTypePipe implements PipeTransform {
  transform(value: GetWaringTypeEnum, ...args) {
    switch (value) {
      case GetWaringTypeEnum.Alarm :
        return '阈值告警'
      case GetWaringTypeEnum.Irrigate :
        return '灌溉任务'
      case GetWaringTypeEnum.Offline :
        return '离线告警'
      case GetWaringTypeEnum.Other :
        return '其他告警'
      default:
        return '未知告警'
    }
  }
}
