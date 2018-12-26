import { JsonObject, JsonProperty } from 'json2typescript'


@JsonObject
export class DcPointHistoryItemRE {
  @JsonProperty('value', Number)
  value: number = undefined
  @JsonProperty('time', Number)
  time: number = undefined
}

@JsonObject
export class DcPointHistoryRE {
  @JsonProperty('history', [DcPointHistoryItemRE])
  data: DcPointHistoryItemRE[] = undefined
}

export class DcPointHistoryLE {
  date: number
  value: number
}
