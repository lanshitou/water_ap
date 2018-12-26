import { Pipe, PipeTransform } from '@angular/core'
import { MessageTypeEnum } from '../../providers/message/entity/message-type'

@Pipe({
  name: 'messageIcon',
})
export class MessageIconPipe implements PipeTransform {
  transform(value: MessageTypeEnum, ...args) {
    switch (value) {
      case MessageTypeEnum.NotifyArticle:
        return './assets/imgs/message/list/img_article.png'
      case MessageTypeEnum.IrrigationFail:
        return './assets/imgs/message/list/img_irri_task_error.png'
      case MessageTypeEnum.Irrigation:
        return './assets/imgs/message/list/img_irri_task_update.png'
      case MessageTypeEnum.DeviceOffline:
        return './assets/imgs/message/list/img_dev_offline_produce.png'
      case MessageTypeEnum.DeviceOnline:
        return './assets/imgs/message/list/img_dev_offline_clean.png'
      case MessageTypeEnum.ThresholdWarningCleared:
        return './assets/imgs/message/list/img_alarm_clean.png'
      case MessageTypeEnum.ThresholdWarningProduced:
        return './assets/imgs/message/list/img_alarm_produce.png'
    }
  }
}
