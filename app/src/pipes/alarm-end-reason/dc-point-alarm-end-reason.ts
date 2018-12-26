import { Pipe, PipeTransform } from '@angular/core'
import { AlarmEndReasonEnum } from "../../providers/entity/waring/waring-enum"

@Pipe({
  name: 'alarmEndReason',
})
export class AlarmEndReasonPipe implements PipeTransform {
  transform(value: AlarmEndReasonEnum, ...args) {
    switch (value) {
      case AlarmEndReasonEnum.ManualChangeLimit:
        return '手动更改预警值,告警解除'
      case AlarmEndReasonEnum.AutoChange:
        return '采集值恢复到正常值,告警解除'
      case AlarmEndReasonEnum.Offline:
        return '传感器离线,告警解除'
      default :
        return '告警解除'
    }
  }
}
