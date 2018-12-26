import { Content, PanGesture, PanGestureConfig, Platform } from 'ionic-angular'
import { pointerCoord } from 'ionic-angular/util/dom'
import { RefreshConfig, RefreshStatusEnum } from './pull-refresh'
import { PullRefreshAnime } from './pull-refresh-anime'

export class PullRefreshGesture extends PanGesture {
  startY: number //起始点

  constructor(opts: PanGestureConfig, plt: Platform, public config: RefreshConfig, public content: Content, public animeCtrl: PullRefreshAnime) {
    super(plt, content._scrollContent.nativeElement, opts)
  }

  //记录按下的起始点
  pointerDown(ev: any): boolean {
    this.startY = pointerCoord(ev).y
    return super.pointerDown(ev)
  }

  pointerMove(ev: any): void {
    //分发
    if (this['captured']) {
      this['debouncer'].write(() => {
        this.onDragMove(ev)
      })
    }
    //一旦不满住位于顶部就放弃该事件
    else if (!this.canStart(ev) ||
      (this['detector'].detect(pointerCoord(ev)) && this['detector'].pan() === 1 && !this.tryToCapture(ev))) {
      this.abort(ev)
    }
  }

  //能否开始 滑动到顶部 且 没有处于刷新中
  canStart(ev: any): boolean {
    return this.content.getScrollElement().scrollTop <= 1 && this.config.refreshStatus === RefreshStatusEnum.Ready
  }

  onDragStart(_ev: any): void {
    this.startY = pointerCoord(_ev).y
    this.animeCtrl.resetAnime()
    this.config.refreshStatus = RefreshStatusEnum.Move
  }

  onDragMove(_ev: any): void {
    let threshold = this.getScrollY(_ev) / this.config.maxThreshold
    this.animeCtrl.pullAnimeCtr.seek(threshold * this.animeCtrl.animeDuration)
  }

  onDragEnd(_ev: any): void {
    let scrollY = this.getScrollY(_ev)
    if (scrollY > this.config.refreshThreshold) {
      this.animeCtrl.refreshing()
    }
    else if (scrollY > 0) {
      this.animeCtrl.refreshHide()
    }
    else {
      this.animeCtrl.resetAnime()
      this.config.refreshStatus = RefreshStatusEnum.Ready
    }
  }

  setAnimeCtrl(v) {
    this.animeCtrl = v
  }

  //距离起始点的距离
  private getScrollY(ev: any): number {
    return pointerCoord(ev).y - this.startY
  }
}
