import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject
export class WaringStatisticRE {
  @JsonProperty('irriWarningCount', Number)
  irrigate: number = undefined
  @JsonProperty('offlineWarningCount', Number)
  offline: number = undefined
  @JsonProperty('thresholdWarningCount', Number)
  alarm: number = undefined
  @JsonProperty('otherWarningCount', Number)
  other: number = undefined
}
