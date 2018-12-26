import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  Input,
  Renderer2
} from '@angular/core'
import { NavController } from "ionic-angular"
import { Observable } from "rxjs"
import { ErrorCode } from "../../contract/error-code"
import { DataLoadHelp } from "../../extend/data-help/data-load-help"
import { DataStatusEnum } from "../../extend/data-help/data-status-enum"
import { InfoCommentRE } from "../../providers/info/entity/comment"
import { InfoProvider } from "../../providers/info/InfoProvider"
import { BaseComponent } from "../base/base-component"

@Component({
  selector: 'comment-warp',
  templateUrl: 'comment-warp.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentWarpComponent extends BaseComponent {

  @Input() articleId: number
  @Input() subjectId: number

  canMore = false
  dataLoadHelp: DataLoadHelp
  data: InfoCommentRE[] = []
  myCommentData: InfoCommentRE[] = []

  constructor(public rend2: Renderer2, public navController: NavController, protected injector: Injector,
              public infoProvider: InfoProvider, public ele: ElementRef, public cdr: ChangeDetectorRef) {
    super(injector)
  }

  onCreate() {
    this.dataLoadHelp = new DataLoadHelp(this.loadErrorTipCmp, undefined, this.loadMoreCmp)
    this.getData(DataStatusEnum.Content)
  }

  submitComment(value: InfoCommentRE) {
    if (!value) return
    this.myCommentData = this.myCommentData.concat(value)
    this.loadErrorTipCmp.showContent()
    this.cdr.detectChanges()
  }

  trackById(index: number, v: any) {
    return v.id
  }

  private getData(status: DataStatusEnum) {
    if (!this.dataLoadHelp.canLoad(status)) return

    let observable: Observable<InfoCommentRE[]>
    if (this.articleId) observable = this.infoProvider.getArticleCommentList(this.articleId, this.data.length, status === DataStatusEnum.Content ? 3 : 20)
    else observable = this.infoProvider.getSubjectCommentList(this.subjectId, this.data.length, status === DataStatusEnum.Content ? 3 : 20)

    observable
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.dataLoadHelp.loadSucceed(v.length < (status === DataStatusEnum.Content ? 3 : 20))
          v = v.filter((it) => this.myCommentData.filter((myIt) => myIt.id === it.id).length === 0)
          if (status === DataStatusEnum.LoadMore) {
            this.data = this.data.concat(v)
          } else {
            this.data = v
          }
          this.cdr.detectChanges()
        },
        (v) => {
          let retryFunction: any
          let errorImg: any
          let errorTip: string
          if (v.code === ErrorCode.Empty) {
            retryFunction = undefined
            errorTip = '沙发空缺, 等你来抢'
            errorImg = './assets/imgs/img_comment_empty.png'
          } else {
            errorTip = v.message
            retryFunction = this.getData.bind(this, status)
          }
          this.dataLoadHelp.loadFailed(errorTip, retryFunction, errorImg)
          if (v.code === ErrorCode.Empty && (this.myCommentData.length > 0 || this.data.length > 0)) this.loadMoreCmp.setLoadNoMore()
          this.cdr.detectChanges()
        }
      )
  }
}
