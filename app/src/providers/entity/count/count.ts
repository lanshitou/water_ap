import { JsonObject, JsonProperty } from 'json2typescript'

@JsonObject
export class CountRE {
  @JsonProperty('count')
  count: number = undefined
}
