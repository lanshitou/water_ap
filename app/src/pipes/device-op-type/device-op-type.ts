import { Pipe, PipeTransform } from '@angular/core'
import { DeviceOperateTypeEnum } from "../../providers/device/entity/arg"
import { DeviceTypeEnum } from "../../providers/entity/device/device-enum"

@Pipe({
  name: 'deviceOpType',
})
export class DeviceOpTypePipe implements PipeTransform {
  transform(value: DeviceOperateTypeEnum, ...args) {
    let deviceType: number = args[0]
    let position: number = args[1]
    switch (value) {
      case DeviceOperateTypeEnum.Start:
        if (deviceType === DeviceTypeEnum.ShutterMachine) {
          if (position === 100) {
            return '上卷'
          } else {
            return '下卷'
          }
        } else {
          return '开启'
        }
      case  DeviceOperateTypeEnum.Stop:
        return '关闭'
    }
  }
}
