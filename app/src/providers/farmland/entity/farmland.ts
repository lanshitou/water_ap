import { Any, JsonObject, JsonProperty } from 'json2typescript'
import { DcPointValueConverter } from '../../entity/dc-point/convert/dc-point-convert'
import { DcPointRE } from '../../entity/dc-point/dc-point'
import { DeviceRE } from '../../entity/device/device'
import { IrrigateRE } from '../../entity/irrigate/irrigate'
import { ModeEnum } from "../../system/entity/systems"

@JsonObject
export class FarmlandRE {
  @JsonProperty('farmlandId', Number)
  id: number = undefined
  @JsonProperty('name', String)
  name: string = undefined
  @JsonProperty('mode', Any)
  mode: ModeEnum = undefined
  @JsonProperty('dcPoints', DcPointValueConverter, true)
  dcPoints: DcPointRE[] = undefined
  @JsonProperty('devices', [DeviceRE], true)
  devices: DeviceRE[] = undefined
  @JsonProperty('irriAreas', [IrrigateRE], true)
  irrigates: IrrigateRE[] = undefined
}
