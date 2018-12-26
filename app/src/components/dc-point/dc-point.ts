import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Injector,
  Input,
  OnChanges,
  Renderer2,
  ViewChild
} from '@angular/core'
import { SimpleChanges } from "@angular/core/src/metadata/lifecycle_hooks"
import * as anime from 'animejs'
import { Content, NavController } from 'ionic-angular'
import { DcPointRE } from "../../providers/entity/dc-point/dc-point"
import { DcPointValueEnum } from "../../providers/entity/dc-point/dc-point-alarm-status-enum"
import { DevBaseComponent } from "../base/dev-base-component"

@Component({
  selector: 'dc-point',
  templateUrl: 'dc-point.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {provide: DevBaseComponent, useExisting: forwardRef(() => DcPointComponent)}
  ]
})
export class DcPointComponent extends DevBaseComponent implements OnChanges {
  @ViewChild('value', {read: ElementRef}) valueEle: ElementRef

  //延迟可见动画
  @Input() visibleDelay: number = -1
  @Input() data: DcPointRE

  constructor(public navController: NavController, protected injector: Injector, public rend2: Renderer2,
              public parentContent: Content, public ele: ElementRef) {
    super(injector, parentContent, rend2, ele)
  }

  ngOnChanges(changes: SimpleChanges) {
    let data = changes.data
    let delay = changes.visibleDelay

    if (delay) {
      this.calcAnime(delay.currentValue)
    } else if (data) {
      this.calcAnime(0, (data.previousValue as DcPointRE).value)
    }
  }

  calcAnime(delay: number = 0, beforeValue: number = 0) {
    if (this.data.value === DcPointValueEnum.Invalid || this.visibleDelay === -1) {
      this.rend2.setProperty(this.valueEle.nativeElement, 'innerText', this.data.value === DcPointValueEnum.Invalid ? '--' : this.data.value)
      return
    }

    beforeValue = beforeValue === DcPointValueEnum.Invalid ? 0 : beforeValue

    if (Math.abs(this.data.value - beforeValue) < 5) {
      this.rend2.setProperty(this.valueEle.nativeElement, 'innerText', this.data.value)
      return
    }
    //目标值是否是整数,如果目标是整数那么目标值不会显示小数值
    let isInt = String(this.data.value).indexOf('.') === -1
    let v = {v: beforeValue}
    anime({
      targets: v,
      v: this.data.value,
      delay: delay,
      duration: 300,
      easing: 'linear',
      update: () => {
        this.rend2.setProperty(this.valueEle.nativeElement, 'innerText', isInt ? Math.round(v.v) : v.v.toFixed(1))
      }
    }).play()
  }

  valueUpdate(dcPoint: DcPointRE) {
    let beforeValue = this.data.value
    Object.assign(this.data, dcPoint)
    this.calcAnime(0, beforeValue)
  }

  @HostListener('click')
  onClick() {
    this.navController.push('DcPointDetailPage', {data: this.data, applyValue: this.valueUpdate.bind(this)})
  }
}
