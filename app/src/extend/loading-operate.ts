import { Loading, LoadingController, LoadingOptions, NavOptions } from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { Operator } from 'rxjs/Operator'
import { Subscriber } from 'rxjs/Subscriber'
import { TeardownLogic } from 'rxjs/Subscription'
import { ServerInject } from '../app/app.component'

function loadingOperate<T>(this: Observable<T>, loadingOption?: LoadingOptions, navOption ?: NavOptions): Observable<T> {
  return this.lift(new LoadingSourceOperator({
    content: '处理中...',
    dismissOnPageChange: true
  }, navOption))
}

class LoadingSourceOperator<T> implements Operator<T, T> {

  constructor(public loadingOption: LoadingOptions, public navOption ?: NavOptions) {
  }

  call(subscriber: Subscriber<T>, source: Observable<T>): TeardownLogic {
    source.subscribe(new LoadingSubscriber(subscriber, this.loadingOption, this.navOption))
  }
}

class LoadingSubscriber<T> extends Subscriber<T> {
  private loading: Loading

  constructor(subscriber: Subscriber<T>, loadingOption: LoadingOptions, navOption ?: NavOptions) {
    super(subscriber)
    let loadingController = ServerInject.get(LoadingController)
    this.loading = loadingController.create(loadingOption)
    this.loading.present(navOption)
  }

  protected _next(value: T): void {
    this.loading.dismissAll()
    super._next(value)
  }

  protected _error(err: any): void {
    this.loading.dismissAll()
    super._error(err)
  }

  protected _complete(): void {
    this.loading.dismissAll()
    super._complete()
  }
}

declare module 'rxjs/Observable' {
  interface Observable<T> {
    loadingOperate: typeof loadingOperate
  }
}
Observable.prototype.loadingOperate = loadingOperate
