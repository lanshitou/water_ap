import 'rxjs/add/operator/first'
import 'rxjs/add/operator/share'
import { Observable } from 'rxjs/Observable'
import { Operator } from 'rxjs/Operator'
import { Subscriber } from 'rxjs/Subscriber'
import { Subscription, TeardownLogic } from 'rxjs/Subscription'
import { ILifecycleOwner, LifecycleEnum } from './page-lifecycle-owner'

declare module 'rxjs/Observable' {
  interface Observable<T> {
    bindLifecycle: typeof bindLifecycle
  }
}

Observable.prototype.bindLifecycle = bindLifecycle

export function bindLifecycle<T>(this: Observable<T>, lifecycleOwner: ILifecycleOwner, until: LifecycleEnum = LifecycleEnum.OnDestroy): Observable<T> {
  return this.lift(new LifeSourceOperator(lifecycleOwner, until))
}

//生命周期绑定转发
class LifeSourceOperator<T> implements Operator<T, T> {
  constructor(public lifecycleOwner: ILifecycleOwner, public until: LifecycleEnum) {
  }

  call(subscriber: Subscriber<T>, source: Observable<T>): TeardownLogic {
    source.subscribe(new LifeSourceSubscriber(subscriber, this.lifecycleOwner, this.until))
  }
}

//生命周期绑定实现
class LifeSourceSubscriber<T> extends Subscriber<T> {
  data: T = undefined
  private version = 0
  private pendingVersion = 0
  private isActive = false
  private lifeSubscription: Subscription

  constructor(subscriber: Subscriber<T>, public owner: ILifecycleOwner, public until: LifecycleEnum) {
    super(subscriber)
    this.subscribeLifecycle()
  }

  next(value?: T): void {
    this.data = value
    this.pendingVersion++
    this.considerNotify()
  }

  protected _error(err: any): void {
    super._error(err)
    this.lifeSubscription.unsubscribe()
    this.lifeSubscription = undefined
    this.isActive = false
    this.destination = undefined
    this.owner = undefined
    this.until = undefined
    this.data = undefined
  }

  protected _complete(): void {
    super._complete()
    this.lifeSubscription.unsubscribe()
    this.lifeSubscription = undefined
    this.isActive = false
    this.destination = undefined
    this.owner = undefined
    this.until = undefined
    this.data = undefined
  }

  private subscribeLifecycle() {
    this.lifeSubscription = this.owner.lifecycleOwner.subscribe(this.onStateChange.bind(this))
  }

  private onStateChange(status: LifecycleEnum) {
    if (status >= this.until) {
      this._complete()
      return
    }
    this.isActive = status <= LifecycleEnum.onEnter
    this.considerNotify()
  }

  private considerNotify() {
    if (!this.isActive || this.pendingVersion <= this.version) return
    this.version = this.pendingVersion
    this._next(this.data)
  }
}
