import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core'
import { InfiniteScroll } from 'ionic-angular'

@Component({
  selector: 'load-more',
  templateUrl: 'load-more.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadMoreComponent implements OnDestroy {
  @Input() loadingSpinner = 'dots'
  @Input() loadingText = undefined
  @Input() noMoreText = '没有更多了'
  @Input() failedText = '加载失败 点击重试'
  @Output() onLoadMore = new EventEmitter<LoadMoreComponent>()
  @ViewChild(InfiniteScroll) infiniteCmp: InfiniteScroll
  loadStatus = LoadMoreStatusEnum.Complete
  private isDestroy = false

  constructor(public cdr: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.isDestroy = true
  }

  //触发刷新
  onInfinite() {
    if (this.isDestroy) return
    if (this.loadStatus !== LoadMoreStatusEnum.Complete) this.infiniteCmp.complete()
    else {
      this.loadStatus = LoadMoreStatusEnum.Loading
      this.onLoadMore.emit()
      this.cdr.detectChanges()
    }
  }

  //点击重试
  onContentClick() {
    if (this.loadStatus === LoadMoreStatusEnum.Failed) this.onLoadMore.emit()
  }

  setLoadComplete() {
    if (this.isDestroy || this.loadStatus >= LoadMoreStatusEnum.Complete) return
    if (this.infiniteCmp) this.infiniteCmp.complete()
    this.loadStatus = LoadMoreStatusEnum.Complete
    this.cdr.detectChanges()
  }

  setLoadFailed() {
    if (this.isDestroy || this.loadStatus >= LoadMoreStatusEnum.Failed) return
    if (this.infiniteCmp) this.infiniteCmp.complete()
    this.loadStatus = LoadMoreStatusEnum.Failed
    this.cdr.detectChanges()
  }

  setLoadNoMore() {
    if (this.isDestroy || this.loadStatus >= LoadMoreStatusEnum.NoMore) return
    if (this.infiniteCmp) this.infiniteCmp.complete()
    this.loadStatus = LoadMoreStatusEnum.NoMore
    this.cdr.detectChanges()
  }

  setDisable() {
    if (this.isDestroy || this.loadStatus === LoadMoreStatusEnum.Disable) return
    if (this.infiniteCmp) {
      this.infiniteCmp.complete()
      this.infiniteCmp.enable(false)
    }
    this.loadStatus = LoadMoreStatusEnum.Disable
    this.cdr.detectChanges()
  }

  setEnable() {
    if (this.isDestroy || this.loadStatus !== LoadMoreStatusEnum.Disable) return
    if (this.infiniteCmp) {
      this.infiniteCmp.complete()
      this.infiniteCmp.enable(true)
    }
    this.loadStatus = LoadMoreStatusEnum.Complete
    this.cdr.detectChanges()
  }

  reset() {
    if (this.infiniteCmp) {
      this.infiniteCmp.complete()
      this.infiniteCmp.enable(true)
    }
    this.loadStatus = LoadMoreStatusEnum.Complete
    this.cdr.detectChanges()
  }
}

enum LoadMoreStatusEnum {
  Loading = 1,
  Complete = 2,
  Failed = 3,
  NoMore = 4,
  Disable = 5,
}
