import { Injector, QueryList, ViewChild, ViewChildren } from '@angular/core'
import { App, Content, Platform } from 'ionic-angular'
import { debounceTime } from "rxjs/operators"
import { BaseComponent } from '../../components/base/base-component'
import { LoadMoreComponent } from '../../components/load-more/load-more'
import { LoadingErrorTipComponent } from '../../components/loading-error-tip/loading-error-tip'
import { PullRefreshComponent } from '../../components/pull-refresh/pull-refresh'
import { getRootNav } from '../../extend/ionic/nav'
import { PageLifecycleOwner } from '../../extend/lifecycle/page-lifecycle-owner'
import { decodeURLParams } from "../../extend/url-params"
import { TokenManageProvider } from '../../providers/token/token-manage'
import { UserOauthRE } from '../../providers/user/entity/user-oauth'

export class BasePage extends PageLifecycleOwner {
  htmlTitle = ''
  urlParams: Map<string, string> = new Map()

  @ViewChild(LoadingErrorTipComponent) loadErrorTipCmp: LoadingErrorTipComponent
  @ViewChild(PullRefreshComponent) pullRefreshCmp: PullRefreshComponent
  @ViewChild(LoadMoreComponent) loadMoreCmp: LoadMoreComponent
  @ViewChild(Content) contentCmp: Content
  @ViewChildren(BaseComponent) baseComponents: QueryList<BaseComponent>

  private backButtonRemove: Function

  constructor(protected injector: Injector) {
    super(injector)
    this.urlParams = decodeURLParams()
  }

  //登录状态变更回调 , 默认点击后打开登录页面
  onOauthStateChange(entity: UserOauthRE | undefined) {
    if (!entity) {
      if (this.loadErrorTipCmp) {
        this.loadErrorTipCmp.showError('请先登录', this.toOauthPage.bind(this))
      }
      this.toOauthPage()
    }
  }

  ionViewDidLoad() {
    super.ionViewDidLoad()
    this.oauthStateObserver() //观察登状态
  }

  ionViewDidEnter() {
    super.ionViewDidEnter()
    document.title = this.htmlTitle //修改窗口标题
    this.backButtonRemove = this.injector.get(Platform).registerBackButtonAction(this.backAction.bind(this), this.viewController._zIndex)
  }

  ionViewDidLeave() {
    super.ionViewDidLeave()
    if (this.backButtonRemove) this.backButtonRemove()
  }

  //页面是否可以返回,后面还要经过CanLeave === true 才会真正返回 (默认canLeave true
  //一般只需要关注CanBack就可以了  CanLeave 会有 进入其他页面离开, 返回 和 加载新页面
  canBackButton(): boolean {
    return !this.baseComponents.find((v) => !v.canBackButton())
  }

  //跳转登录
  toOauthPage() {
    getRootNav(this.viewController.getNav()).push('LoginInPage', undefined, {updateUrl: true})
  }

  backAction() {
    if (this.canBackButton()) this.injector.get(App).goBack()
  }

  //登录状态观测
  private oauthStateObserver() {
    TokenManageProvider.ev.changeEvent
      .pipe(debounceTime(300))
      .bindLifecycle(this)
      .subscribe(this.onOauthStateChange.bind(this))
  }
}
