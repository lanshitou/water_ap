import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({name: 'urlTransform'})
export class UrlTransformPipe implements PipeTransform {
  constructor(public san: DomSanitizer) {
  }

  transform(value: any, ...args: any[]) {
    return value ? this.san.bypassSecurityTrustStyle(`url("${value}")`) : ''
  }
}
