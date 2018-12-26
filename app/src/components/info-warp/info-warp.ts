import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input } from '@angular/core'
import { NavController } from "ionic-angular"
import { InfoContentTypeEnum, InfoPreviewRE } from "../../providers/info/entity/info-preview"
import { InfoPreviewWarpRE } from "../../providers/info/entity/info-preview-warp"
import { InfoProvider } from "../../providers/info/InfoProvider"
import { BaseComponent } from "../base/base-component"

@Component({
  selector: 'info-warp',
  templateUrl: 'info-warp.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoWarpComponent extends BaseComponent {
  @Input() data: InfoPreviewWarpRE

  constructor(protected injector: Injector, public infoProvider: InfoProvider, public navCtrl: NavController, public cdr: ChangeDetectorRef) {
    super(injector)
  }

  onItemClick(item: InfoPreviewRE) {
    switch (item.type) {
      case  InfoContentTypeEnum.Article:
        item.watchCount++
        this.cdr.detectChanges()
        this.navCtrl.push('ArticlePage', item.id)
        break
      case  InfoContentTypeEnum.Subject:
        break
    }
  }

  trackById(index: number, v: any) {
    return v.id
  }
}
