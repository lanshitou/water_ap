import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector } from '@angular/core'
import { IonicPage, NavParams, ViewController } from 'ionic-angular'
import { LifecycleEnum } from '../../extend/lifecycle/page-lifecycle-owner'
import { BasePage } from '../../pages/base/base-page'
import { LoadingPageConfig } from "./loading-page-controller"

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'loading-page',
  templateUrl: 'loading-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingPageComponent extends BasePage {
  config: LoadingPageConfig
  private dismissTimeout: number

  constructor(protected injector: Injector, public navParams: NavParams, public viewController: ViewController,
              public cdr: ChangeDetectorRef) {
    super(injector)
  }

  configChange(c: LoadingPageConfig) {
    if (this.lastEvent === LifecycleEnum.OnDestroy) return
    this.config = c
    this.cdr.detectChanges()
    this.config.callBack = this.configChange.bind(this)
    clearTimeout(this.dismissTimeout)
    if (this.config.dismissDelay > 0) {
      this.dismissTimeout = setTimeout(() => {
        this.viewController.dismiss()
      }, this.config.dismissDelay)
    }
  }

  onCreate() {
    this.configChange(this.navParams.get('config'))
  }

  canBackButton() {
    super.canBackButton()
    return false
  }

}
