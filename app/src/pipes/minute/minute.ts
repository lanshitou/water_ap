import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'minute',
})
export class MinutePipe implements PipeTransform {
  transform(value: number, ...args) {
    let minute = value / 1000 / 60
    if (minute >= 60) {
      return (minute / 60).toFixed(0) + '小时' + (minute % 60).toFixed() + '分钟'
    } else {
      return minute.toFixed(0) + '分钟'
    }
  }
}
