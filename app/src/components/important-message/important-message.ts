import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input } from '@angular/core'
import { NavController } from "ionic-angular"
import { ImportantMessageRE } from "../../providers/message/entity/message"
import { MessageProvider } from "../../providers/message/message"
import { ToastControllerExProvider } from "../../providers/toast-control-ex/toast-controler-ex"
import { BaseComponent } from "../base/base-component"

@Component({
  selector: 'important-message',
  templateUrl: 'important-message.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportantMessageComponent extends BaseComponent {
  @Input() data: ImportantMessageRE

  constructor(protected injector: Injector, public messageProvider: MessageProvider, public toastProvider: ToastControllerExProvider,
              public cdr: ChangeDetectorRef, public navCtrl: NavController) {
    super(injector)
  }

  onItemClick() {
    this.messageProvider.markImportantMessageRead(this.data.id)
      .loadingOperate()
      .subscribe(
        () => {
          this.navCtrl.push('ArticlePage', this.data.id)
          this.data.isRead = true
          this.cdr.detectChanges()
        },
        (v) => {
          this.toastProvider.show({message: v.message})
        }
      )
  }
}
