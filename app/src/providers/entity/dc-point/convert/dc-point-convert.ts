import { JsonConvert, JsonConverter, JsonCustomConvert } from 'json2typescript'
import { DcPointRE } from '../dc-point'
import { DcPointTypeEnum, DcPointValueEnum } from '../dc-point-alarm-status-enum'

export function dcPointValueConvertUtil(type: DcPointTypeEnum, value: number, derection: 'serverToLocal' | 'localToServer' = 'serverToLocal') {
  if (value === DcPointValueEnum.Invalid) return DcPointValueEnum.Invalid
  switch (type) {
    case DcPointTypeEnum.AIR_HUMI:
    case DcPointTypeEnum.SOIL_HUMI:
    case DcPointTypeEnum.AIR_TEMP:
    case DcPointTypeEnum.SOIL_TEMP:
    case DcPointTypeEnum.SOIL_PH:
      return derection === 'serverToLocal' ? value / 10 : value * 10
    case DcPointTypeEnum.SOIL_CONDUCTIVITY:
    case DcPointTypeEnum.SOIL_SALINITY:
    case DcPointTypeEnum.ILLU_N:
    case DcPointTypeEnum.CO2_CONC:
      return value
  }
}

@JsonConverter
export class DcPointValueConverter implements JsonCustomConvert<DcPointRE> {
  serialize(data: DcPointRE): any {
    return undefined
  }

  deserialize(data: any): DcPointRE {
    let jsonConvert = new JsonConvert()
    let dcPoint = jsonConvert.deserialize(data, DcPointRE)
    //处理数组形式
    if (dcPoint instanceof Array) {
      dcPoint.map((v) => {
        v.value = dcPointValueConvertUtil(v.type, v.value)
        return v
      })
    }
    //处理对象形式
    else {
      dcPoint.value = dcPointValueConvertUtil(dcPoint.type, dcPoint.value)
    }
    return dcPoint
  }
}
