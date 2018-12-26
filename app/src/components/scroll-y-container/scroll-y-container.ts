import { Component, ElementRef, Input } from '@angular/core'

@Component({
  selector: 'scroll-y-container',
  templateUrl: 'scroll-y-container.html',
})
export class ScrollYContainerComponent {
  @Input() paddingStart = 0
  @Input() paddingEnd = 0

  constructor(public ele: ElementRef) {
  }

  scrollToEle(target: HTMLElement) {
    let sc = this.ele.nativeElement as HTMLElement
    let offset = 0
    let scrollLeft = sc.scrollLeft
    let targetLeft = target.offsetLeft
    offset = scrollLeft - targetLeft
    if (offset > 0) {
      sc.scrollTo(targetLeft, 0)
      return
    }

    let scrollRight = sc.scrollLeft + sc.clientWidth
    let targetRight = target.offsetLeft + target.clientWidth
    offset = targetRight - scrollRight
    if (offset > 0) sc.scrollTo(targetRight, 0)
  }
}
