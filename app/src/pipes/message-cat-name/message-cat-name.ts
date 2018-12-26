import { Pipe, PipeTransform } from '@angular/core'
import { MessageTypeEnum } from "../../providers/message/entity/message-type"

@Pipe({
  name: 'messageCatName',
})
export class MessageCatNamePipe implements PipeTransform {
  transform(value: MessageTypeEnum, ...args) {
    switch (value) {
      case MessageTypeEnum.NotifyArticle :
        return '系统通知'
      case MessageTypeEnum.Irrigation :
      case MessageTypeEnum.IrrigationFail :
        return '灌溉任务'
      case MessageTypeEnum.DeviceOffline :
      case MessageTypeEnum.DeviceOnline :
        return '离线告警'
      case MessageTypeEnum.ThresholdWarningProduced :
      case MessageTypeEnum.ThresholdWarningCleared :
        return '阈值告警'
      default:
        return '未知消息'
    }
  }
}
