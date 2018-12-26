import { Pipe, PipeTransform } from '@angular/core'
import { InfoContentTypeEnum } from "../../providers/info/entity/info-preview"


@Pipe({
  name: 'infoType',
})
export class InfoTypePipe implements PipeTransform {
  transform(value: InfoContentTypeEnum, ...args) {
    switch (value) {
      case InfoContentTypeEnum.Article :
        return '文章'
      case InfoContentTypeEnum.Subject :
        return '专题'
      default:
        return '未知'
    }
  }
}
