import { JsonObject, JsonProperty } from 'json2typescript'

@JsonObject
export class UserOauthRE {
  @JsonProperty('uid')
  uid: number = undefined
  @JsonProperty('token')
  token: string = undefined
}
