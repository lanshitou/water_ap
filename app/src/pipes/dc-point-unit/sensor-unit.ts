import { Pipe, PipeTransform } from '@angular/core'
import { DcPointTypeEnum } from '../../providers/entity/dc-point/dc-point-alarm-status-enum'


@Pipe({
  name: 'dcPointUnit',
})
export class DcPointUnitPipe implements PipeTransform {
  transform(value: number, ...args) {
    switch (value) {
      case  DcPointTypeEnum.SOIL_TEMP:
        return '°C'
      case DcPointTypeEnum.SOIL_HUMI:
        return 'RH'
      case  DcPointTypeEnum.AIR_TEMP :
        return '°C'
      case DcPointTypeEnum.AIR_HUMI:
        return 'RH'
      case DcPointTypeEnum.CO2_CONC:
        return 'PPM'
      case DcPointTypeEnum.ILLU_N:
        return 'Lux'
      case DcPointTypeEnum.SOIL_SALINITY:
        return 'mg/L'
      case DcPointTypeEnum.SOIL_PH:
        return 'PH'
      case DcPointTypeEnum.SOIL_CONDUCTIVITY:
        return 'uS/cm'
      default:
        return '--'
    }
  }
}
