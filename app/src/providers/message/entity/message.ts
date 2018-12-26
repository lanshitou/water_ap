import { Any, JsonObject, JsonProperty } from 'json2typescript'
import { MessageTypeEnum } from './message-type'

@JsonObject
export class NotifyMessageRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('msgId', Any, true)
  msgId: number = undefined
  @JsonProperty('type')
  type: MessageTypeEnum = undefined
  extension: any = undefined
}

@JsonObject
export class BaseMessageRE extends NotifyMessageRE {
  @JsonProperty('title')
  title: string = undefined
  @JsonProperty('createDate')
  createDate: number = undefined
  @JsonProperty('summary')
  content: string = undefined
  @JsonProperty('read')
  isRead: boolean = undefined
}


@JsonObject
export class ImportantMessageRE {
  @JsonProperty('articleId')
  id: number = undefined
  @JsonProperty('createTime')
  createDate: number = undefined
  @JsonProperty('verify')
  isRead: boolean = undefined
  @JsonProperty('title')
  title: string = undefined
  @JsonProperty('summary')
  content: string = undefined
}
