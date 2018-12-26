import { Any, JsonObject, JsonProperty } from "json2typescript"
import { InfoPreviewRE } from "./info-preview"

export enum InfoWarpTypeEnum {
  TwoInOneLine = 1, //一行两个 左右排布
  OneLineBig = 2, //一行一个 大图模式
  OneLineSmall = 3, //一行一个 小图模式
  OneLineGallery = 4, //横向滚动 大图模式
}

@JsonObject
export class InfoPreviewWarpRE {
  @JsonProperty("warpTitle", String, true)
  warpTitle: string = undefined
  @JsonProperty("warpType", Any)
  warpType: InfoWarpTypeEnum = undefined
  @JsonProperty("content", [InfoPreviewRE])
  content: InfoPreviewRE[] = undefined
}
