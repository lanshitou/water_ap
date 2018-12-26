import { Any, JsonObject, JsonProperty } from 'json2typescript'

@JsonObject
export class UserInfoRE {
  @JsonProperty('headerImage', Any, true)
  headerImage: string = undefined
  @JsonProperty('username')
  nickName: string = undefined
  @JsonProperty('mobile')
  mobile: string = undefined
}
