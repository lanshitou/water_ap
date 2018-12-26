import { Pipe, PipeTransform } from '@angular/core'
import { FarmlandIrriStatusEnum } from "../../providers/system/entity/farmland-irri-status-enum"

@Pipe({
  name: 'farmlandIrriStatus',
})
export class FarmlandIrriStatusPipe implements PipeTransform {

  transform(value: FarmlandIrriStatusEnum, ...args) {
    switch (value) {
      case  FarmlandIrriStatusEnum.NotWorking:
        return '未浇水'
      case  FarmlandIrriStatusEnum.Waiting:
        return '等待浇水'
      case  FarmlandIrriStatusEnum.Working:
        return '正在浇水'
      case  FarmlandIrriStatusEnum.Unknown:
        return '浇水状态未知'
    }
  }
}
