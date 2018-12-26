import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Injector, Input } from '@angular/core'
import { InfoCommentRE } from "../../providers/info/entity/comment"
import { InfoProvider } from "../../providers/info/InfoProvider"
import { ToastControllerExProvider } from "../../providers/toast-control-ex/toast-controler-ex"
import { BaseComponent } from "../base/base-component"

@Component({
  selector: 'comment-item',
  templateUrl: 'comment-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentItemComponent extends BaseComponent {
  @Input() data: InfoCommentRE
  handler = false
  clickLikeComment = false

  constructor(public infoProvider: InfoProvider, protected injector: Injector,
              public toastProvider: ToastControllerExProvider, public cdr: ChangeDetectorRef) {
    super(injector)
  }

  likeComment() {
    if (this.handler) return
    this.handler = true
    this.clickLikeComment = true

    this.data.isLike = true
    this.data.likeCount++
    this.cdr.detectChanges()
    this.handler = false

    this.infoProvider.likeComment(this.data.id)
      .bindLifecycle(this)
      .subscribe(
        () => {
        },
        (v) => {
          this.data.isLike = false
          this.data.likeCount--
          this.cdr.detectChanges()

          this.toastProvider.show({message: v.message})
          this.handler = false
        }
      )
  }
}
