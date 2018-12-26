import { LoadMoreComponent } from '../../components/load-more/load-more'
import { CodeType, LoadingErrorTipComponent } from '../../components/loading-error-tip/loading-error-tip'
import { PullRefreshComponent } from '../../components/pull-refresh/pull-refresh'
import { ErrorCode } from '../../contract/error-code'
import { DataStatusEnum } from './data-status-enum'

export class DataLoadHelp {
  dataStatus: DataStatusEnum = DataStatusEnum.None

  constructor(public errorTip?: LoadingErrorTipComponent, public refresh?: PullRefreshComponent, public loadMore?: LoadMoreComponent) {
  }

  canLoad(status: DataStatusEnum): boolean {
    if (this.dataStatus !== DataStatusEnum.None) return false
    switch (status) {
      case DataStatusEnum.Content :
        if (this.errorTip) this.errorTip.showLoading()
        if (this.refresh) this.refresh.stopRefresh()
        if (this.loadMore) this.loadMore.setLoadComplete()
        break
      case DataStatusEnum.Refresh :
        if (this.refresh) this.refresh.startRefresh()
        if (this.loadMore) this.loadMore.setLoadComplete()
        break
      case DataStatusEnum.LoadMore :
        if (this.refresh) this.refresh.stopRefresh()
        break
    }
    this.dataStatus = status
    return true
  }

  loadSucceed(noMore: boolean = false) {
    if (this.errorTip) this.errorTip.showContent()
    if (this.refresh) this.refresh.stopRefresh()
    if (this.loadMore) noMore ? this.loadMore.setLoadNoMore() : this.loadMore.setLoadComplete()
    this.dataStatus = DataStatusEnum.None
  }

  loadFailed(error: CodeType | string, tryDo?: Function, img?: string) {
    switch (this.dataStatus) {
      case DataStatusEnum.Content :
        if (this.errorTip) this.errorTip.showError(error, tryDo, img)
        if (this.refresh) this.refresh.stopRefresh()
        if (this.loadMore) this.loadMore.setLoadComplete()
        break
      case DataStatusEnum.Refresh :
        if (this.refresh) this.refresh.stopRefresh()
        if (this.loadMore) this.loadMore.setLoadComplete()
        break
      case DataStatusEnum.LoadMore :
        if (this.refresh) this.refresh.stopRefresh()
        if (this.loadMore) {
          if (typeof error !== 'string' && error.code === ErrorCode.Empty) this.loadMore.setLoadNoMore()
          else this.loadMore.setLoadFailed()
        }
        break
    }
    this.dataStatus = DataStatusEnum.None
  }
}
