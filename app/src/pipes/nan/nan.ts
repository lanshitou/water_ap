import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'nan',
})
export class NanPipe implements PipeTransform {
  transform(value: number, ...args) {
    return isNaN(value)
  }
}
