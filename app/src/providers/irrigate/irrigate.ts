import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'
import { ServerUrl } from '../../contract/url'
import { Api } from '../base/api'
import { getServerTime } from '../base/base-interceptor'
import { IrrigateRE, IrrigateTaskRE } from '../entity/irrigate/irrigate'
import { IrrigateTaskStatusEnum } from '../entity/irrigate/irrigate-enum'
import { SystemProvider } from '../system/system'
import { IrrigationTaskLE, IrrigationTasksLE, IrrigationTaskTypeEnum } from './entity/irrigation'
import { IrrigateTaskProcessingRE } from "./entity/processing-irrigate"
import { IasIrrigatesRLE } from './entity/task-irrigates'

@Injectable()
export class IrrigateProvider extends Api {
  postIrrigationTask(v: IrrigationTaskLE[], type: IrrigationTaskTypeEnum) {
    return this.http.post(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/irrigation`, new IrrigationTasksLE(type, v))
      .apiOperate<undefined>(undefined)
  }

  getIrrigatesHistory(irriAreaId: number, offset: number, limit: number) {
    return this.http.get(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/irrigation/${irriAreaId}/history`,
      {params: {offset: offset.toString(), limit: limit.toString()}})
      .apiOperate<IrrigateTaskRE[]>(IrrigateTaskRE)
  }

  getIrrigatesTask(isAddIrrigate: boolean): Observable<IasIrrigatesRLE[]> {
    return this.http.get(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/irrigation/tasks/summary`)
      .apiOperate<IasIrrigatesRLE[]>(IasIrrigatesRLE)
      .pipe(
        map(
          (v) => {
            for (let farmland of v) {
              for (let irri of farmland.irrigates) {
                let task = irri.task
                //选出有效的任务
                if (isAddIrrigate) {
                  //停止的任务才能添加 没有任何记录的任务
                  if (task === undefined || task.status === IrrigateTaskStatusEnum.Stoped) {
                    irri.enable = true
                    farmland.selectableSize++
                  }
                }
                else {
                  //停止和停止中的任务不能添加了
                  if (task !== undefined && task.status < IrrigateTaskStatusEnum.Stoping) {
                    irri.enable = true
                    farmland.selectableSize++
                  }
                }
                //计算浇水程度百分比
                irri.percent = this.calcTaskPercent(task)
              }
            }
            return v
          }
        )
      )
  }

  getIrrigatesTaskProcessing() {
    return this.http.get(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/irrigation/tasks`)
      .apiOperate<IrrigateTaskProcessingRE[]>(IrrigateTaskProcessingRE)
  }

  calcTaskPercent(task?: IrrigateTaskRE) {
    let percent
    //计算浇水程度百分比
    if (task === undefined || task.status < IrrigateTaskStatusEnum.Runed) percent = 0
    else if (task.status === IrrigateTaskStatusEnum.Runed || task.status === IrrigateTaskStatusEnum.Stoping) {
      let diff = getServerTime() - task.startDate
      let result = diff / (task.expDuration * 1000)
      percent = result > 1 ? 1 : result < 0 ? 0 : result
    } else percent = -2
    return percent
  }

  createIrrigationTaskParams(farmlandId: number, duration: number, irrigates: IrrigateRE[]) {
    let result: IrrigationTaskLE[] = []
    irrigates.forEach((v) => {
      let taskLE = new IrrigationTaskLE()
      taskLE.farmlandId = farmlandId
      taskLE.areaId = v.id
      taskLE.duration = Math.round(duration) //时间单位s
      result.push(taskLE)
    })
    return result
  }
}
