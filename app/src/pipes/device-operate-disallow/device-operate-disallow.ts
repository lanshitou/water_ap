import { Pipe, PipeTransform } from '@angular/core'
import { DeviceStatusEnum } from '../../providers/entity/device/device-enum'

@Pipe({
  name: 'deviceOperateDisallow',
})
export class DeviceOperateAllowPipe implements PipeTransform {
  transform(value: number, ...args) {
    let isOpenButton: boolean = args[0]
    switch (value) {
      case DeviceStatusEnum.Offline:
        return true
      case DeviceStatusEnum.On :
      case DeviceStatusEnum.Opened:
      case DeviceStatusEnum.Openning:
        return isOpenButton
      case DeviceStatusEnum.Off :
      case DeviceStatusEnum.Closed:
      case DeviceStatusEnum.Closing:
        return !isOpenButton
      case DeviceStatusEnum.Stopped:
        return false
      default:
        return false
    }
  }
}
