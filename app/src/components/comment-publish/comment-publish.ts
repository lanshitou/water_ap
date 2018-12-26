import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  Output,
  Renderer2
} from '@angular/core'
import { Content, NavController, ScrollEvent } from "ionic-angular"
import { Observable } from "rxjs/Rx"
import { InfoCommentRE } from "../../providers/info/entity/comment"
import { InfoProvider } from "../../providers/info/InfoProvider"
import { ToastControllerExProvider } from "../../providers/toast-control-ex/toast-controler-ex"
import { BaseComponent } from "../base/base-component"

@Component({
  selector: 'comment-publish',
  templateUrl: 'comment-publish.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentPublishComponent extends BaseComponent {
  @Input() content: Content
  @Input() articleId: number
  @Input() subjectId: number
  @Input() ele: ElementRef
  @Output() onSubmitComment = new EventEmitter<InfoCommentRE>()

  comment = ''

  constructor(public rend2: Renderer2, public navController: NavController, protected injector: Injector,
              public infoProvider: InfoProvider, public toastProvider: ToastControllerExProvider,
              public thisEle: ElementRef) {
    super(injector)
  }

  onCreate() {
    let element = this.ele.nativeElement as HTMLElement
    let thisElement = this.thisEle.nativeElement as HTMLElement
    this.content.ionScroll
      .subscribe(
        (v: ScrollEvent) => {
          if ((v.scrollTop + v.contentHeight - 56) > element.offsetTop) this.rend2.addClass(thisElement, 'show-comment')
          else this.rend2.removeClass(thisElement, 'show-comment')
        }
      )
  }

  submitComment() {
    let observable: Observable<InfoCommentRE>
    if (this.articleId) observable = this.infoProvider.postArticleComment(this.articleId, this.comment)
    else observable = this.infoProvider.postSubjectComment(this.subjectId, this.comment)

    observable.bindLifecycle(this)
      .loadingOperate()
      .subscribe(
        (v) => {
          this.onSubmitComment.emit(v)
        },
        (v) => {
          this.toastProvider.show({message: v.message})
        }
      )
  }
}
