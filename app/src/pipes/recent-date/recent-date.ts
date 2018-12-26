import { Pipe, PipeTransform } from '@angular/core'
import { getServerTime } from '../../providers/base/base-interceptor'

@Pipe({
  name: 'recentDate',
})
export class RecentDatePipe implements PipeTransform {
  transform(value: number, ...args) {
    let diffTime = getServerTime() - value
    let h = 60 * 60 * 1000
    let d = 24 * h
    if (diffTime > 365 * d) return '一年前'
    else if (diffTime > 180 * d) return '半年前'
    else if (diffTime > 30 * d) return '一个月前'
    else if (diffTime >= 7 * d) return '一周前'
    else if (diffTime > d) return `${Math.round((diffTime / d) - 0.5)}天前`
    else if (diffTime >= h) return `${Math.round((diffTime / h) - 0.5)}小时前`
    else if (diffTime >= 60 * 1000) return Math.round((diffTime / 60 / 1000) - 0.5) + '分钟前'
    else return '刚刚'
  }
}
