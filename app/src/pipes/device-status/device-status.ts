import { Pipe, PipeTransform } from '@angular/core'
import { DeviceStatusEnum, DeviceTypeEnum } from '../../providers/entity/device/device-enum'

@Pipe({
  name: 'deviceStatus',
})
export class DeviceStatusPipe implements PipeTransform {
  transform(value: number, ...args) {
    let deviceType: number = args[0]
    switch (value) {
      case DeviceStatusEnum.Offline:
        return '离线'
      case  DeviceStatusEnum.On:
        return '开启'
      case  DeviceStatusEnum.Off:
        return '关闭'
      case  DeviceStatusEnum.Closed :
        return deviceType === DeviceTypeEnum.ShutterMachine ? '停止' : '关闭'
      case DeviceStatusEnum.Opened:
        return deviceType === DeviceTypeEnum.ShutterMachine ? '停止' : '开启'
      case DeviceStatusEnum.Stopped:
        return '停止'
      case DeviceStatusEnum.Openning:
        return deviceType === DeviceTypeEnum.ShutterMachine ? '上卷中' : '开启中'
      case DeviceStatusEnum.Closing:
        return deviceType === DeviceTypeEnum.ShutterMachine ? '下卷中' : '关闭中'
      default:
        return '未知'
    }
  }
}
