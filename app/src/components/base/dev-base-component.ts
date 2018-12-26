import { ElementRef, Injector, QueryList, Renderer2, ViewChildren } from "@angular/core"
import { Content, Platform } from "ionic-angular"
import { ServerInject } from "../../app/app.component"
import { BaseComponent } from "./base-component"

export class DevBaseComponent extends BaseComponent {
  data: any
  @ViewChildren(DevBaseComponent) devBaseCmps: QueryList<DevBaseComponent>

  constructor(protected injector: Injector, public parentContent: Content, public rend2: Renderer2, public ele: ElementRef) {
    super(injector)
  }

  sharkDev(id: number, type: number) {
    if (this.devBaseCmps.length > 0) {
      return this.devBaseCmps.filter((v) => v.sharkDev(id, type)).length > 0
    } else if (id === this.data.id && (type === undefined || type === this.data.type)) {
      let platform = ServerInject.get(Platform)
      this.rend2.addClass(this.ele.nativeElement, 'shark-anime')
      let el = this.ele.nativeElement as HTMLElement
      this.parentContent.scrollTo(0, el.offsetTop - 128, 0)
      let unregister: Function
      unregister = platform.registerListener(document, 'touchstart', () => {
        this.rend2.removeClass(this.ele.nativeElement, 'shark-anime')
        unregister()
      }, {zone: false, capture: true, passive: true})
      return true
    }
    return false
  }
}
