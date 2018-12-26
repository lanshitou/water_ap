import { JsonObject, JsonProperty } from 'json2typescript'
import { IrrigateRE } from '../../entity/irrigate/irrigate'

@JsonObject
export class IrrigateRLE extends IrrigateRE {
  selected: boolean = false
  enable: boolean = false
  percent: number = -1
}

@JsonObject
export class IasIrrigatesRLE {
  @JsonProperty('farmlandId')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
  @JsonProperty('irriAreas', [IrrigateRLE])
  irrigates: IrrigateRLE[] = undefined

  selectedSize: number = 0
  selectableSize: number = 0
}
