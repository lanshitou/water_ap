import { JsonObject, JsonProperty } from 'json2typescript'

@JsonObject
export class SystemsRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
}

export enum ModeEnum {
  Manual = 1,
  Auto = 2
}
