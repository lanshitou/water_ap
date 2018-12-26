import { JsonObject, JsonProperty } from 'json2typescript'
import { DcPointValueConverter } from '../dc-point/convert/dc-point-convert'
import { DcPointRE } from '../dc-point/dc-point'
import { WaringTypeEnum } from "../waring/waring-enum"
import { DeviceStatusEnum, DeviceTypeEnum } from './device-enum'

@JsonObject
export class DeviceRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
  @JsonProperty('status')
  status: DeviceStatusEnum = undefined
  @JsonProperty('type')
  type: DeviceTypeEnum = undefined
  @JsonProperty('operable', Boolean)
  operable: boolean = undefined
  @JsonProperty('alarmType')
  alarmType: WaringTypeEnum = undefined
  @JsonProperty('dcPoints', DcPointValueConverter, true)
  dcPoints: DcPointRE[] = undefined
}
