import { AfterViewInit, Injector, OnDestroy } from '@angular/core'
import { ViewController } from 'ionic-angular'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ILifecycleEvent, ILifecycleOwner, LifecycleEnum, PageLifecycleOwner } from './page-lifecycle-owner'

export class ComponentLifecycleOwner implements ILifecycleOwner, ILifecycleEvent, AfterViewInit, OnDestroy {
  lifecycleOwner: BehaviorSubject<LifecycleEnum> = new BehaviorSubject(LifecycleEnum.OnInit)
  lastEvent: LifecycleEnum = LifecycleEnum.OnInit

  viewController: ViewController

  constructor(protected injector: Injector) {
    this.viewController = injector.get(ViewController)
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

  //初始化入口
  ngAfterViewInit(): void {
    this.lastEvent = LifecycleEnum.OnInit
    this.onCreate()
    this.subscribeLifeEvent()
  }

  ngOnDestroy(): void {
    this.lastEvent = LifecycleEnum.OnDestroy
    this.onDestroy()
    this.lifecycleOwner.next(LifecycleEnum.OnDestroy)
  }

  //注册页面生命周期观察者
  private subscribeLifeEvent() {
    let instance = this.viewController.instance as PageLifecycleOwner

    //实时转发
    instance.lifecycleOwner.subscribe(
      (v) => {
        switch (v) {
          case  LifecycleEnum.onEnter:
            this.lastEvent = LifecycleEnum.onEnter
            this.onEnter()
            this.lifecycleOwner.next(LifecycleEnum.onEnter)
            break
          case  LifecycleEnum.onLeave:
            this.lastEvent = LifecycleEnum.onLeave
            this.onLeave()
            this.lifecycleOwner.next(LifecycleEnum.onLeave)
            break
        }
      }
    )
  }
}
