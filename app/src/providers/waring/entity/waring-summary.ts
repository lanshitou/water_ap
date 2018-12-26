import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject
export class WaringSummaryRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('produceTime')
  produceTime: number = undefined
  @JsonProperty('location')
  title: string = undefined
  @JsonProperty('summary')
  summary: string = undefined
}
