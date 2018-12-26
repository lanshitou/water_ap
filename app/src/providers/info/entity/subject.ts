import { Any, JsonObject, JsonProperty } from "json2typescript"
import { InfoPreviewWarpRE } from "./info-preview-warp"

@JsonObject
export class InfoSubjectRE {
  @JsonProperty("id", Any)
  id: number = undefined
  @JsonProperty("title", String)
  title: string = undefined
  @JsonProperty("img", String)
  img: string = undefined
  @JsonProperty("originImg", String)
  originImg: string = undefined
  @JsonProperty("watchCount", Number)
  watchCount: number = undefined
  @JsonProperty("commentCount", Number)
  commentCount: number = undefined
  @JsonProperty("publishTime")
  publishTime: number = undefined
  @JsonProperty("origin", Any)
  origin: string = undefined
  @JsonProperty("summary", String)
  summary: string = undefined
  @JsonProperty("content", [InfoPreviewWarpRE])
  content: InfoPreviewWarpRE[] = undefined
}
