import { Pipe, PipeTransform } from '@angular/core'
import { IrrigateTaskResultStatusEnum } from "../../providers/entity/irrigate/irrigate-enum"

/**
 * Generated class for the IrrigateResultStatusPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'irrigateResultStatus',
})
export class IrrigateResultStatusPipe implements PipeTransform {

  transform(value: IrrigateTaskResultStatusEnum, ...args) {
    switch (value) {
      case IrrigateTaskResultStatusEnum.UserManualCancel:
        return '手动停止'
      case IrrigateTaskResultStatusEnum.AutoComplete:
        return '自动完成'
      case IrrigateTaskResultStatusEnum.ErrorMsg:
        return '浇水失败'
      default:
        return ''
    }
  }
}
