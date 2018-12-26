import { Injector, QueryList, ViewChild, ViewChildren } from '@angular/core'
import { ComponentLifecycleOwner } from '../../extend/lifecycle/component-lifecycle-owner'
import { LoadMoreComponent } from '../load-more/load-more'
import { LoadingErrorTipComponent } from '../loading-error-tip/loading-error-tip'
import { PullRefreshComponent } from '../pull-refresh/pull-refresh'

export class BaseComponent extends ComponentLifecycleOwner {
  @ViewChild(LoadingErrorTipComponent) loadErrorTipCmp: LoadingErrorTipComponent
  @ViewChild(PullRefreshComponent) pullRefreshCmp: PullRefreshComponent
  @ViewChild(LoadMoreComponent) loadMoreCmp: LoadMoreComponent
  @ViewChildren(BaseComponent) baseComponents: QueryList<BaseComponent>

  constructor(protected injector: Injector) {
    super(injector)
  }

  //分发给子组件
  canBackButton(): boolean {
    return !this.baseComponents.find((v) => !v.canBackButton())
  }
}
