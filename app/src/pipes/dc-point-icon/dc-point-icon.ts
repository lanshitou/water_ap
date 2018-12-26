import { Pipe, PipeTransform } from '@angular/core'
import { DcPointTypeEnum } from "../../providers/entity/dc-point/dc-point-alarm-status-enum"

@Pipe({
  name: 'dcPointIcon',
})
export class DcPointIconPipe implements PipeTransform {
  transform(value: number, ...args) {
    let prefix = './assets/imgs/dc-point/img_'
    switch (value) {
      case DcPointTypeEnum.SOIL_TEMP:
        return prefix + 'soil_temp.png'
      case DcPointTypeEnum.SOIL_HUMI:
        return prefix + 'soil_humi.png'
      case DcPointTypeEnum.AIR_TEMP :
        return prefix + 'air_temp.png'
      case DcPointTypeEnum.AIR_HUMI:
        return prefix + 'air_humi.png'
      case DcPointTypeEnum.CO2_CONC:
        return prefix + 'co2_conc.png'
      case DcPointTypeEnum.ILLU_N:
        return prefix + 'illu_n.png'
      case DcPointTypeEnum.SOIL_SALINITY:
        return prefix + 'soil_salinity.png'
      case DcPointTypeEnum.SOIL_PH:
        return prefix + 'soil_ph.png'
      case DcPointTypeEnum.SOIL_CONDUCTIVITY:
        return prefix + 'soil_conductivity.png'
      default:
        return prefix + '未知'
    }
  }
}
