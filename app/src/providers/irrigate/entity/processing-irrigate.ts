import { JsonObject, JsonProperty } from "json2typescript"
import { IrrigateTaskRE } from "../../entity/irrigate/irrigate"

@JsonObject
export class IrrigateTaskProcessingRE extends IrrigateTaskRE {
  @JsonProperty('farmlandName', String, true)
  farmlandName: string = undefined //开始任务的用户
  @JsonProperty('irriAreaName', String, true)
  irriAreaName: string = undefined //停止任务的用户
}
