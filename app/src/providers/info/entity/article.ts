import { Any, JsonObject, JsonProperty } from "json2typescript"
import { InfoPreviewWarpRE } from "./info-preview-warp"


@JsonObject
export class InfoArticleRE {
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
  @JsonProperty("tag", [String], true)
  tag: string[] = undefined
  @JsonProperty("htmlContent", String)
  htmlContent: string = undefined
}

@JsonObject
export class InfoArticleWarpRE {
  @JsonProperty("article", InfoArticleRE)
  article: InfoArticleRE = undefined
  @JsonProperty("relateArticleList", InfoPreviewWarpRE)
  relateArticleList: InfoPreviewWarpRE = undefined
}
