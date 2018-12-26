import { JsonObject, JsonProperty } from "json2typescript"

@JsonObject
export class BasicUserRE {
  @JsonProperty('uid')
  uid: number = undefined
  @JsonProperty('headImage', String, true)
  headerImage: string = undefined
  @JsonProperty('username', String)
  username: string = undefined
}
