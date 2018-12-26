import { Pipe, PipeTransform } from '@angular/core'
import { GetMessageTypeEnum } from "../../providers/message/entity/message-type"

@Pipe({
  name: 'getMessageCatName',
})
export class GetMessageCatNamePipe implements PipeTransform {
  transform(value: GetMessageTypeEnum, ...args) {
    switch (value) {
      case GetMessageTypeEnum.Notify :
        return '系统通知'
      case GetMessageTypeEnum.Irrigation :
        return '灌溉任务'
      case GetMessageTypeEnum.Offline :
        return '离线告警'
      case GetMessageTypeEnum.Alarm :
        return '阈值告警'
      default:
        return '未知消息'
    }
  }
}
