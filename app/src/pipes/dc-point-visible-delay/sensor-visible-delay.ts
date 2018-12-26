import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'dcPointVisibleDelay',
})
export class DcPointVisibleDelayPipe implements PipeTransform {
  transform(visible: boolean, ...args) {
    let index = args[0]
    if (visible) return Math.floor(index / 2) * 120 + (index % 2) * 60 + 300
    return -1
  }
}
