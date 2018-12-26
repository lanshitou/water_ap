import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject
export class MessageIasUnreadRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
  @JsonProperty('count')
  count: number = undefined
}
