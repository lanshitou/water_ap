import { Injector } from '@angular/core'
import { ViewController } from 'ionic-angular'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

export class PageLifecycleOwner implements ILifecycleOwner, ILifecycleEvent {
  lifecycleOwner: BehaviorSubject<LifecycleEnum> = new BehaviorSubject(LifecycleEnum.OnInit)
  lastEvent: LifecycleEnum = LifecycleEnum.OnInit

  viewController: ViewController

  constructor(protected injector: Injector) {
    this.viewController = injector.get(ViewController)
  }

  ionViewDidLoad() {
    this.lastEvent = LifecycleEnum.OnInit
    this.onCreate()
    this.lifecycleOwner.next(LifecycleEnum.OnInit)
  }

  ionViewWillUnload() {
    this.lastEvent = LifecycleEnum.OnDestroy
    this.onDestroy()
    this.lifecycleOwner.next(LifecycleEnum.OnDestroy)
  }

  ionViewDidEnter() {
    this.lastEvent = LifecycleEnum.onEnter
    this.onEnter()
    this.lifecycleOwner.next(LifecycleEnum.onEnter)
  }

  ionViewDidLeave() {
    this.lastEvent = LifecycleEnum.onLeave
    this.onLeave()
    this.lifecycleOwner.next(LifecycleEnum.onLeave)
  }

  ionViewCanEnter() {
    return this.canEnter()
  }

  ionViewCanLeave() {
    return this.canLeave()
  }

  //自定义回调封装
  onCreate() {
  }

  onEnter() {
  }

  onLeave() {
  }

  onDestroy() {
  }

  canEnter(): boolean {
    return true
  }

  canLeave(): boolean {
    return true
  }
}

//现在生命周期状态枚举
export enum LifecycleEnum {
  OnInit,
  onEnter,
  onLeave,
  OnDestroy
}

//生命周期拥有者
export interface ILifecycleOwner {
  lifecycleOwner: BehaviorSubject<LifecycleEnum>
  lastEvent: LifecycleEnum
}

//生命周期回调
export interface ILifecycleEvent {
  onCreate()

  onEnter()

  onLeave()

  onDestroy()
}
