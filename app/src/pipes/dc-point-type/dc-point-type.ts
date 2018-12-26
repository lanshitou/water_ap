import { Pipe, PipeTransform } from '@angular/core'
import { DcPointTypeEnum } from '../../providers/entity/dc-point/dc-point-alarm-status-enum'


@Pipe({
  name: 'dcPointType',
})
export class DcPointTypePipe implements PipeTransform {
  transform(value: number, ...args) {
    switch (value) {
      case DcPointTypeEnum.SOIL_TEMP:
        return '土壤温度'
      case DcPointTypeEnum.SOIL_HUMI:
        return '土壤湿度'
      case DcPointTypeEnum.AIR_TEMP :
        return '空气温度'
      case DcPointTypeEnum.AIR_HUMI:
        return '空气湿度'
      case DcPointTypeEnum.CO2_CONC:
        return '二氧化碳'
      case DcPointTypeEnum.ILLU_N:
        return '光照强度'
      case DcPointTypeEnum.SOIL_SALINITY:
        return '盐分'
      case DcPointTypeEnum.SOIL_PH:
        return 'PH值'
      case DcPointTypeEnum.SOIL_CONDUCTIVITY:
        return '电导率'
      default:
        return '未知'
    }
  }
}
