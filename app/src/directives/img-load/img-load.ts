import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core'


@Directive({
  selector: '[img-load]',
})
export class ImgLoadDirective {
  @Input() imgDefault: string = './assets/imgs/svg_img_load_ing.svg'
  @Input() imgError: string = './assets/imgs/svg_img_load_failed.svg'
  @Output() onClickEvent = new EventEmitter<boolean>()

  private loadFailed = false

  private _imgSrc: string

  @Input('img-load') get imgSrc(): string {
    return this._imgSrc
  }

  set imgSrc(value: string) {
    if (this._imgSrc === value && !this.loadFailed) return
    this._imgSrc = value


    let image = new Image()
    image.src = this._imgSrc

    if (image.complete) {
      this.setSrc(this.imgSrc)
      this.loadFailed = false
    }
    else {
      this.setSrc(this.imgDefault)

      image.onload = () => {
        this.loadFailed = false
        this.setSrc(this.imgSrc)
      }
      image.onerror = () => {
        this.loadFailed = true
        this.setSrc(this.imgError)
      }
    }
  }

  constructor(public ele: ElementRef, public rend2: Renderer2) {
  }

  @HostListener('click')
  onClick() {
    this.onClickEvent.emit(this.loadFailed)
    if (!this.loadFailed) return
    this.imgSrc = this.imgSrc
  }

  private setSrc(src: string) {
    let ele = this.ele.nativeElement as HTMLElement
    this.rend2.setStyle(ele, 'background', `url("${src}") no-repeat`)
    this.rend2.setStyle(ele, 'background-color', `#efefef`)
    this.rend2.setStyle(ele, 'background-position', `center`)
    this.rend2.setStyle(ele, 'background-size', `cover`)
  }
}
