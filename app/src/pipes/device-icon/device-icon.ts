import { Pipe, PipeTransform } from '@angular/core'
import { DeviceTypeEnum } from "../../providers/entity/device/device-enum"

@Pipe({
  name: 'deviceIcon',
})
export class DeviceIconPipe implements PipeTransform {
  transform(value: DeviceTypeEnum, ...args) {
    let result = './assets/imgs/device/'
    switch (value) {
      case DeviceTypeEnum.ElectronicValve:
      case DeviceTypeEnum.ElectromagneticValve:
        result += 'img_electromagneticvalve'
        break
      case DeviceTypeEnum.PulseElectromagneticValve:
        result += 'img_pulseelectromagneticvalve'
        break
      case DeviceTypeEnum.Pump:
        result += 'img_pump'
        break
      case DeviceTypeEnum.Fan:
        result += 'img_fan'
        break
      case DeviceTypeEnum.ShutterMachine:
        result += 'img_shuttermachine'
        break
      case DeviceTypeEnum.GrowLight:
        result += 'img_growlight'
        break
      case DeviceTypeEnum.Healer:
        result += 'img_healer'
        break
      case DeviceTypeEnum.Dehumidifier:
        result += 'img_dehumidifier'
        break
      default:
        result += 'img_growlight'
    }
    return result + '.png'
  }
}
