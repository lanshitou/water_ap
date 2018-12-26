import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input } from '@angular/core'
import { NavController } from "ionic-angular"
import { BaseMessageRE } from "../../providers/message/entity/message"
import { MessageProvider } from "../../providers/message/message"
import { ToastControllerExProvider } from "../../providers/toast-control-ex/toast-controler-ex"
import { BaseComponent } from "../base/base-component"


@Component({
  selector: 'message-item',
  templateUrl: 'message-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent extends BaseComponent {
  @Input() data: BaseMessageRE

  constructor(protected injector: Injector, public messageProvider: MessageProvider, public toastProvider: ToastControllerExProvider,
              public cdr: ChangeDetectorRef, public navCtrl: NavController) {
    super(injector)
  }

  onItemClick() {
    this.messageProvider.getMessageDetail(this.data)
      .bindLifecycle(this)
      .loadingOperate()
      .subscribe(
        () => {
          this.cdr.detectChanges()
          this.messageProvider.actionByType(this.data)
          this.messageProvider.messageChangeEvent.emit()
        },
        (v) => {
          this.toastProvider.show({message: v.message})
        }
      )
  }
}
