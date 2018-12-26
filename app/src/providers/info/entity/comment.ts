import { JsonObject, JsonProperty } from "json2typescript"
import { BasicUserRE } from "../../entity/user/basic-user-info"

@JsonObject
export class InfoCommentRE {
  @JsonProperty("user", BasicUserRE)
  user: BasicUserRE = undefined
  @JsonProperty("content", String)
  content: String = undefined
  @JsonProperty("id", Number)
  id: number = undefined
  @JsonProperty("publishTime")
  publishTime: number = undefined
  @JsonProperty("likeCount", Number)
  likeCount: number = undefined
  @JsonProperty("like", Boolean)
  isLike: boolean = undefined
}
