import { Component, ElementRef, EventEmitter, Injector, Input, Output, Renderer2, ViewChild } from '@angular/core'
import { NavController, NavParams, Platform } from "ionic-angular"
import * as nippleJs from "nipplejs"
import { BaseComponent } from "../base/base-component"


@Component({
  selector: 'joystick',
  templateUrl: 'joystick.html'
})
export class JoystickComponent extends BaseComponent {
  @Output() onMoveEvent = new EventEmitter<string>()
  @ViewChild('left') leftEle: ElementRef
  @ViewChild('up') topEle: ElementRef
  @ViewChild('right') rightEle: ElementRef
  @ViewChild('down') downEle: ElementRef
  private joystick: any
  private lastDirection: string

  private _config: JoystickConfig

  @Input() get config(): JoystickConfig {
    return this._config
  }

  set config(value: JoystickConfig) {
    if (!value || this._config === value) return
    this._config = value
    this.setup()
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public rend2: Renderer2, public platform: Platform, public ele: ElementRef) {
    super(injector)
  }

  onDestroy() {
    if (this.joystick) this.joystick.destroy()
  }

  private setup() {
    if (this.joystick) this.joystick.destroy()

    this.joystick = nippleJs.create(
      {
        zone: this.ele.nativeElement,
        color: '#108EE8',
        size: Math.round((this.ele.nativeElement as HTMLElement).clientWidth * 0.55),
        mode: 'static',
        restOpacity: 0.8,
        position: {
          top: '50%',
          left: '50%'
        },
        lockX: this.config.lockX,
        lockY: this.config.lockY
      }
    )

    this.joystick.on('move', (v, data) => {
      if (!data.direction) return
      let direction = data.direction.angle
      if (direction === this.lastDirection) return
      this.lastDirection = direction
      this.applyDirection(direction)
    }).on('end', () => {
      this.lastDirection = 'end'
      this.applyDirection('end')
    })
  }

  private applyDirection(direction: string) {
    this.rend2.removeStyle(this.topEle.nativeElement, 'display')
    this.rend2.removeStyle(this.leftEle.nativeElement, 'display')
    this.rend2.removeStyle(this.rightEle.nativeElement, 'display')
    this.rend2.removeStyle(this.downEle.nativeElement, 'display')

    switch (direction) {
      case 'up':
        this.rend2.setStyle(this.topEle.nativeElement, 'display', 'block')
        break
      case 'down':
        this.rend2.setStyle(this.downEle.nativeElement, 'display', 'block')
        break
      case 'left':
        this.rend2.setStyle(this.leftEle.nativeElement, 'display', 'block')
        break
      case 'right':
        this.rend2.setStyle(this.rightEle.nativeElement, 'display', 'block')
        break
    }

    this.onMoveEvent.emit(direction)
  }
}

export class JoystickConfig {
  lockX: boolean = false
  lockY: boolean = false
}
