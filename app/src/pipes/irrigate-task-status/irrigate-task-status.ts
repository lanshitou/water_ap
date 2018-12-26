import { Pipe, PipeTransform } from '@angular/core'
import { IrrigateTaskStatusEnum } from '../../providers/entity/irrigate/irrigate-enum'

@Pipe({
  name: 'irrigateTaskStatus',
})
export class IrrigateTaskStatusPipe implements PipeTransform {
  transform(value: IrrigateTaskStatusEnum, ...args) {
    switch (value) {
      case IrrigateTaskStatusEnum.Waitting :
        return '等待中'
      case IrrigateTaskStatusEnum.Starting :
        return '启动中'
      case IrrigateTaskStatusEnum.Runed :
        return '浇水中'
      case IrrigateTaskStatusEnum.Stoping :
        return '停止中'
      case IrrigateTaskStatusEnum.Stoped :
        return '已停止'
      default:
        return '未知'
    }
  }
}
