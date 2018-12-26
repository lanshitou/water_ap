import { JsonConvert, JsonConverter, JsonCustomConvert, JsonObject, JsonProperty } from 'json2typescript'
import { DcPointValueConverter } from '../../entity/dc-point/convert/dc-point-convert'
import { DcPointRE } from '../../entity/dc-point/dc-point'
import { WaringTypeEnum } from "../../entity/waring/waring-enum"

@JsonObject
export class DcPointAlarmCE {
  @JsonProperty('alarmType')
  alarmType: WaringTypeEnum = undefined //告警类型
  @JsonProperty('threshold')
  threshold: number = undefined //告警值
}

export class DcPointAlarmRLE {
  upperLimit: number = undefined //告警上限
  lowerLimit: number = undefined //告警下限
}

@JsonConverter
export class DcPointAlarmConvert implements JsonCustomConvert<DcPointAlarmRLE> {
  serialize(data: DcPointAlarmRLE): any {
    return undefined
  }

  deserialize(data: any): DcPointAlarmRLE {
    if (!data || data.length === 0) return undefined

    let jsonConvert = new JsonConvert()
    let alarmRE = jsonConvert.deserialize(data, DcPointAlarmCE) as DcPointAlarmCE[]
    let dcPointAlarmRLE = new DcPointAlarmRLE()
    alarmRE.forEach((v) => {
      switch (v.alarmType) {
        case WaringTypeEnum.LowerLimit:
          dcPointAlarmRLE.lowerLimit = v.threshold
          break
        case WaringTypeEnum.UpperLimit:
          dcPointAlarmRLE.upperLimit = v.threshold
          break
      }
    })
    return dcPointAlarmRLE
  }
}

@JsonObject
export class DcPointAlarmConfigRE {
  @JsonProperty('dcPoint', DcPointValueConverter)
  dcPoint: DcPointRE = undefined
  @JsonProperty('configs', DcPointAlarmConvert)
  alarms: DcPointAlarmRLE = undefined
}

