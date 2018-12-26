import { Any, JsonObject, JsonProperty } from "json2typescript"
import { BasicUserRE } from "../../entity/user/basic-user-info"

@JsonObject
export class DeviceOperateHistoryRE {
  @JsonProperty('id')
  id: number = undefined
  @JsonProperty('time')
  time: number = undefined //执行时间
  @JsonProperty('result')
  result: number = undefined //执行结果
  @JsonProperty('duration', Number)
  duration: number = undefined //执行类型
  @JsonProperty('opType')
  opType: number = undefined //执行类型
  @JsonProperty('param', Any, true)
  param: number = undefined //启动参数
  @JsonProperty('user', BasicUserRE)
  user: BasicUserRE = undefined //执行类型
}
