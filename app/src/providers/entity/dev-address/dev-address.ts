import { Any, JsonObject, JsonProperty } from "json2typescript"

@JsonObject
export class DevAddressRE {
  @JsonProperty('type', Any)
  type: number = undefined
  @JsonProperty('iasId', Any, true)
  iasId: number = undefined
  @JsonProperty('irriFerId', Any, true)
  irriFerId: number = undefined
  @JsonProperty('farmlandId', Any, true)
  farmlandId: number = undefined
  @JsonProperty('areaId', Any, true)
  areaId: number = undefined
  @JsonProperty('devId', Any, true)
  devId: number = undefined
  @JsonProperty('parentDevId', Any, true)
  parentDevId: number = undefined

  @JsonProperty('iasName', Any, true)
  iasName: string = undefined
  @JsonProperty('irriFerName', Any, true)
  irriFerName: string = undefined
  @JsonProperty('farmlandName', Any, true)
  farmlandName: string = undefined
  @JsonProperty('areaName', Any, true)
  areaName: string = undefined
  @JsonProperty('devName', Any, true)
  devName: string = undefined
  @JsonProperty('parentDevName', Any, true)
  parentDevName: string = undefined
}
