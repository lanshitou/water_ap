import { JsonObject, JsonProperty } from 'json2typescript'

@JsonObject
export class MessagePreviewRE {
  @JsonProperty('title')
  title: string = undefined
  @JsonProperty('unreadCount')
  unreadCount: number = undefined
}

@JsonObject
export class MessagePreviewWarpRE {
  @JsonProperty('notify', MessagePreviewRE)
  notify: MessagePreviewRE = undefined
  @JsonProperty('irrigate', MessagePreviewRE)
  irrigate: MessagePreviewRE = undefined
  @JsonProperty('offline', MessagePreviewRE)
  offline: MessagePreviewRE = undefined
  @JsonProperty('alarm', MessagePreviewRE)
  alarm: MessagePreviewRE = undefined
}
