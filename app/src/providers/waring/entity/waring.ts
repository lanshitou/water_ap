import { Any, JsonObject, JsonProperty } from "json2typescript"
import { DevAddressRE } from "../../entity/dev-address/dev-address"
import { WaringTypeEnum } from "../../entity/waring/waring-enum"

@JsonObject
export class WaringRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('type')
  type: WaringTypeEnum = undefined
  @JsonProperty('cleared')
  cleared: Boolean = undefined
  @JsonProperty('produceTime')
  produceTime: number = undefined
  @JsonProperty('clearTime', Any, true)
  clearTime: number = undefined
  @JsonProperty('clearReason', Any, true)
  clearReason: number = undefined
  @JsonProperty('addr', DevAddressRE)
  addr: DevAddressRE = undefined
  @JsonProperty('ext', Any, true)
  ext: any = undefined
}
