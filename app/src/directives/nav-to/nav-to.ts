import { Directive, HostListener, Input } from '@angular/core'
import { NavController, NavOptions } from 'ionic-angular'
import { Page } from 'ionic-angular/navigation/nav-util'

@Directive({
  selector: '[navTo]'
})
export class NavToDirective {
  @Input() navTo: Page | string
  @Input() params: any
  @Input() option: NavOptions

  constructor(public navController: NavController) {
  }

  @HostListener('click')
  push() {
    this.navController.push(this.navTo, this.params, this.option)
  }
}
