import { JsonObject, JsonProperty } from 'json2typescript'

@JsonObject
export class CameraCapabilityRE {
  @JsonProperty('ptz_zoom')
  ptzZoom: string = undefined
  @JsonProperty('ptz_left_right')
  ptzLeftRight: string = undefined
  @JsonProperty('ptz_top_bottom')
  ptzTopBottom: string = undefined
  @JsonProperty('ptz_45')
  ptz45: string = undefined
  @JsonProperty('support_ptz')
  support_ptz: string = undefined
}

@JsonObject
export class CameraRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
  @JsonProperty('sn')
  sn: string = undefined
  @JsonProperty('wsAddr', String, true)
  ws: string = undefined
  @JsonProperty('hlsHD', String, true)
  hlsHD: string = undefined
  @JsonProperty('capability', CameraCapabilityRE)
  capability: CameraCapabilityRE = undefined
}

@JsonObject
export class CameraAccessTokenRE {
  @JsonProperty('accessToken')
  accessToken: string = undefined
  @JsonProperty('expDate')
  expDate: number = undefined
}
