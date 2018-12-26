/* tslint:disable */
import { Content, Platform } from "ionic-angular"
import { pointerCoord } from "ionic-angular/util/dom"
import { ServerInject } from "../../app/app.component"

let oldInit = Content.prototype.ngAfterViewInit
let oldDestroy = Content.prototype.ngOnDestroy

export function bounceScrollBlock() {
  Content.prototype.ngAfterViewInit = delegateInit
  Content.prototype.ngOnDestroy = delegateDestroy
}


function delegateInit() {
  oldInit.apply(this)
  let scrollElement = this._scroll.ev.scrollElement as HTMLElement
  let platform = ServerInject.get(Platform)

  this._touchStartUnregistFunc = platform.registerListener(scrollElement, 'touchstart', (v) => {
    this._touchStartY = pointerCoord(v).y
  }, {zone: false, passive: false, capture: false})

  this._touchMoveUnregistFunc = platform.registerListener(scrollElement, 'touchmove', (v) => {
    if (scrollElement.querySelector('ion-content > .scroll-content')) return

    if (scrollElement.scrollTop <= 0 && (pointerCoord(v).y - this._touchStartY) > 0) {
      v.preventDefault()
    }
    else if (scrollElement.scrollTop + scrollElement.clientHeight >= scrollElement.scrollHeight && (pointerCoord(v).y - this._touchStartY) < 0) {
      v.preventDefault()
    }
  }, {zone: false, passive: false, capture: false})
}

function delegateDestroy() {
  oldDestroy.apply(this)
  if (this._touchStartUnregistFunc) this._touchStartUnregistFunc()
  if (this._touchMoveUnregistFunc) this._touchMoveUnregistFunc()
}
