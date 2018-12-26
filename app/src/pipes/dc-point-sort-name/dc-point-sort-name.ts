import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'dcPointSortName',
})
export class DcPointSortNamePipe implements PipeTransform {
  transform(value: string, ...args) {
    let split = value.split('|')
    return split.length > 1 ? split[1] : args[0] //0 默认值
  }
}
