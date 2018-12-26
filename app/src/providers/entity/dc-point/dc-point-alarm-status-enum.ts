export enum DcPointTypeEnum {
  SOIL_TEMP = 1, //土壤温度
  SOIL_HUMI = 2, //土壤湿度
  AIR_TEMP = 3, //空气温度
  AIR_HUMI = 4, //空气湿度
  CO2_CONC = 5, //CO2浓度
  ILLU_N = 6, //光照强度
  SOIL_CONDUCTIVITY = 12, //土壤电导率
  SOIL_SALINITY = 13, //土壤盐分
  SOIL_PH = 14, //土壤PH值
}

export enum DcPointStatusEnum {
  DEV_STATE_OFFLINE = -1, //状态离线
  DEV_STATE_OK = 120, //状态正常
}

export enum DcPointValueEnum {
  Invalid = 2147483647, //无效值
  TempMax = 100, //温度最大值
  TempMin = -100, //温度最小值
  HumiMax = 100, //湿度最大值
  HumiMin = 0, //湿度最小值
  Co2Max = 5000, //二氧化碳最大值
  Co2Min = 0, //二氧化碳最小值
  IlluMax = 200000, //最大光照强度
  IlluMin = 0, //最小光照强度
  ConductivityMax = 5000, //电导率最大值
  ConductivityMin = 0, //电导率最小值
  SalinityMax = 3000, //土壤盐分最大值
  SalinityMin = 0, //土壤盐分最小值
  PhMax = 14, //PH最大值
  PhMin = 0, //PH最小值
}


export function getDcPointMaxValue(type: DcPointTypeEnum) {
  switch (type) {
    case DcPointTypeEnum.SOIL_HUMI:
    case DcPointTypeEnum.AIR_HUMI:
      return DcPointValueEnum.HumiMax
    case DcPointTypeEnum.SOIL_TEMP:
    case DcPointTypeEnum.AIR_TEMP:
      return DcPointValueEnum.TempMax
    case DcPointTypeEnum.CO2_CONC:
      return DcPointValueEnum.Co2Max
    case DcPointTypeEnum.ILLU_N:
      return DcPointValueEnum.IlluMax
    case DcPointTypeEnum.SOIL_CONDUCTIVITY:
      return DcPointValueEnum.ConductivityMax
    case DcPointTypeEnum.SOIL_SALINITY:
      return DcPointValueEnum.SalinityMax
    case DcPointTypeEnum.SOIL_PH:
      return DcPointValueEnum.PhMax
    default:
      return 1
  }
}

export function getDcPointMinValue(type: DcPointTypeEnum) {
  switch (type) {
    case DcPointTypeEnum.SOIL_HUMI:
    case DcPointTypeEnum.AIR_HUMI:
      return DcPointValueEnum.HumiMin
    case DcPointTypeEnum.SOIL_TEMP:
    case DcPointTypeEnum.AIR_TEMP:
      return DcPointValueEnum.TempMin
    case DcPointTypeEnum.CO2_CONC:
      return DcPointValueEnum.Co2Min
    case DcPointTypeEnum.ILLU_N:
      return DcPointValueEnum.IlluMin
    case DcPointTypeEnum.SOIL_CONDUCTIVITY:
      return DcPointValueEnum.ConductivityMin
    case DcPointTypeEnum.SOIL_SALINITY:
      return DcPointValueEnum.SalinityMin
    case DcPointTypeEnum.SOIL_PH:
      return DcPointValueEnum.PhMin
    default:
      return 0
  }
}
