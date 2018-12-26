import { NgModule } from '@angular/core'
import { ImgLoadDirective } from './img-load/img-load'
import { NavToDirective } from './nav-to/nav-to'

@NgModule({
  declarations: [NavToDirective,
    ImgLoadDirective],
  imports: [],
  exports: [NavToDirective,
    ImgLoadDirective]
})
export class DirectivesModule {
}
