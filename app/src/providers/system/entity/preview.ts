import { JsonObject, JsonProperty } from 'json2typescript'
import { DcPointValueConverter } from '../../entity/dc-point/convert/dc-point-convert'
import { DcPointRE } from '../../entity/dc-point/dc-point'
import { DeviceRE } from '../../entity/device/device'
import { WaringStatisticRE } from "../../entity/waring/waring-statistic"
import { FarmlandIrriStatusEnum } from "./farmland-irri-status-enum"
import { ModeEnum } from './systems'

@JsonObject
export class IrriTaskStatisticRE {
  @JsonProperty('waitAmount')
  waitingAmount: number = undefined
  @JsonProperty('runningNum')
  irrigatingAmount: number = undefined
  @JsonProperty('finishTime')
  finishTime: number = undefined
}

@JsonObject
export class WeatherStationRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
  @JsonProperty('dcPoints', DcPointValueConverter, true)
  dcPoints: DcPointRE[] = undefined
}

@JsonObject
export class IrrigateAndFerSystemRE {
  @JsonProperty('pump', DeviceRE, true)
  pump: DeviceRE = undefined
}

@JsonObject
export class FarmlandOutlinesRE {
  @JsonProperty('farmlandId')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
  @JsonProperty('warningStat', WaringStatisticRE)
  waringStatistic: WaringStatisticRE = undefined
  @JsonProperty('irriStatus')
  irriStatus: FarmlandIrriStatusEnum = undefined
}

@JsonObject
export class CameraPreviewRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
}

@JsonObject
export class SystemPreviewRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
  @JsonProperty('configMode')
  configMode: boolean = undefined
  @JsonProperty('mode')
  mode: ModeEnum = undefined
  @JsonProperty('warningStat', WaringStatisticRE, true)
  WaringStatistic: WaringStatisticRE = undefined
  @JsonProperty('weatherStation', WeatherStationRE, true)
  weatherStation: WeatherStationRE = undefined
  @JsonProperty('dcPoints', DcPointValueConverter, true)
  dcPoints: DcPointRE[] = undefined
  @JsonProperty('devices', [DeviceRE], true)
  devices: DeviceRE[] = undefined
  @JsonProperty('cameraSummaries', [CameraPreviewRE], true)
  cameraPreviews: CameraPreviewRE[] = undefined
  @JsonProperty('irriAndFerSystem', IrrigateAndFerSystemRE, true)
  irriAndFerSys: IrrigateAndFerSystemRE = undefined
  @JsonProperty('farmlands', [FarmlandOutlinesRE], true)
  farmlandOutlines: FarmlandOutlinesRE[] = undefined
}
