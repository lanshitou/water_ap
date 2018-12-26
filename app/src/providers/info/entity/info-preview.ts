import { Any, JsonObject, JsonProperty } from "json2typescript"

export enum InfoContentTypeEnum {
  Article = 1,
  Subject = 2,
}

@JsonObject
export class InfoPreviewRE {
  @JsonProperty("id", Any)
  id: number = undefined
  @JsonProperty("type", Any)
  type: InfoContentTypeEnum = undefined
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
}
