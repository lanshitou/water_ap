import { Pipe, PipeTransform } from '@angular/core'
import { WaringTypeEnum } from "../../providers/entity/waring/waring-enum"

@Pipe({
  name: 'dcPointColor',
})
export class DcPointColorPipe implements PipeTransform {
  transform(value: WaringTypeEnum, ...args) {
    return value ? value === WaringTypeEnum.LowerLimit ? '#59c2ff' :
      value === WaringTypeEnum.UpperLimit ? '#f85656' : '#222222' : '#222222'
  }
}
