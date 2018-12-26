import { JsonObject, JsonProperty } from 'json2typescript'
import { WaringTypeEnum } from "../waring/waring-enum"
import { DcPointStatusEnum, DcPointTypeEnum } from './dc-point-alarm-status-enum'

@JsonObject
export class DcPointRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
  @JsonProperty('type')
  type: DcPointTypeEnum = undefined
  @JsonProperty('value', Number)
  value: number = undefined
  @JsonProperty('status')
  status: DcPointStatusEnum = undefined
  @JsonProperty('configWarn', Boolean)
  configWarn: boolean = undefined
  @JsonProperty('alarmType')
  alarmType: WaringTypeEnum = undefined
}
