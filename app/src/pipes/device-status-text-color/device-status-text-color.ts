import { Pipe, PipeTransform } from '@angular/core'
import { DeviceStatusEnum } from '../../providers/entity/device/device-enum'


@Pipe({
  name: 'deviceStatusTextColor',
})
export class DeviceStatusTextColorPipe implements PipeTransform {
  transform(value: number, ...args) {
    switch (value) {
      case DeviceStatusEnum.Offline:
        return '#ff7461'
      case  DeviceStatusEnum.On:
      case DeviceStatusEnum.Opened:
        return '#64b062'
      case  DeviceStatusEnum.Off:
      case  DeviceStatusEnum.Closed :
      case DeviceStatusEnum.Stopped:
        return '#222222'
      case DeviceStatusEnum.Openning:
      case DeviceStatusEnum.Closing:
        return '#5b9bda'
      default:
        return '#222222'
    }
  }
}
