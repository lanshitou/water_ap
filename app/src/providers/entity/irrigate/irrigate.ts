import { JsonObject, JsonProperty } from 'json2typescript'
import { DcPointValueConverter } from '../dc-point/convert/dc-point-convert'
import { DcPointRE } from '../dc-point/dc-point'
import { DeviceRE } from '../device/device'
import { BasicUserRE } from "../user/basic-user-info"
import { IrrigateTaskResultConvert } from './convert/Irrigate-task-result'
import { IrrigateTaskResultStatusEnum, IrrigateTaskStatusEnum } from './irrigate-enum'

@JsonObject
export class IrrigateTaskRE {
  @JsonProperty('addTime', Number)
  createDate: number = undefined //任务创建时间
  @JsonProperty('startTime', Number, true)
  startDate: number = undefined //任务的开始时间
  @JsonProperty('finishTime', Number, true)
  stopDate: number = undefined //任务的结束时间
  @JsonProperty('expDuration', Number)
  expDuration: number = undefined //用户预期的执行时间
  @JsonProperty('irriDuration', Number, true)
  irriDuration: number = undefined //任务实际执行时间
  @JsonProperty('status')
  status: IrrigateTaskStatusEnum = undefined //灌溉任务状态
  @JsonProperty('result', IrrigateTaskResultConvert, true)
  result: IrrigateTaskResultStatusEnum = undefined //灌溉任务的结果
  @JsonProperty('resultDesc', String, true)
  resultDesc: string = undefined //灌溉任务的结果
  @JsonProperty('createUser', BasicUserRE, true)
  createUser: BasicUserRE = undefined //开始任务的用户
  @JsonProperty('deleteUser', BasicUserRE, true)
  stopUser: BasicUserRE = undefined //停止任务的用户
}

@JsonObject
export class IrrigateRE {
  @JsonProperty('irriAreaId')
  id: number = undefined
  @JsonProperty('name')
  name: string = undefined
  @JsonProperty('irriTask', IrrigateTaskRE, true)
  task: IrrigateTaskRE = undefined
  @JsonProperty('dcPoints', DcPointValueConverter, true)
  dcPoints: DcPointRE[] = undefined
  @JsonProperty('devices', [DeviceRE], true)
  devices: DeviceRE[] = undefined
  @JsonProperty('valves', [DeviceRE], true)
  valves: DeviceRE[] = undefined
}
