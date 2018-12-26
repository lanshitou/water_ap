import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  Renderer2
} from '@angular/core'
import { Content } from 'ionic-angular'
import { takeWhile } from 'rxjs/operators'
import { LifecycleEnum } from "../../extend/lifecycle/page-lifecycle-owner"
import { DcPointRE } from '../../providers/entity/dc-point/dc-point'
import { DevBaseComponent } from "../base/dev-base-component"

@Component({
  selector: 'dc-point-group',
  templateUrl: 'dc-point-group.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: DevBaseComponent, useExisting: forwardRef(() => DcPointGroupComponent)}
  ]
})
export class DcPointGroupComponent extends DevBaseComponent {
  firstVisible = false

  _data: DcPointRE[]

  @Input()
  get data() {
    return this._data
  }

  set data(v) {
    this._data = v
    setTimeout(() => {
      if (this.lastEvent !== LifecycleEnum.OnDestroy) this.considerVisible()
    })
  }

  constructor(protected injector: Injector, public ele: ElementRef, public content: Content,
              public cdr: ChangeDetectorRef, public parentContent: Content, public rend2: Renderer2) {
    super(injector, parentContent, rend2, ele)
  }

  onCreate() {
    this.content.ionScroll
      .bindLifecycle(this)
      .pipe(takeWhile(this.considerVisible.bind(this)))
      .subscribe()
  }

  considerVisible() {
    let nativeElement = this.ele.nativeElement as HTMLElement
    let offsetTop = nativeElement.offsetTop
    let scrollEl = this.content._scroll._el
    let scrollBottom = scrollEl.scrollTop + scrollEl.clientHeight
    if (offsetTop < scrollBottom) {
      this.firstVisible = true
      this.cdr.detectChanges()
      return false
    }
    return true
  }

  trackById(index: number, item: any) {
    return item.id
  }
}
