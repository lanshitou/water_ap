import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core'
import { Content, DomController, GestureController, Platform } from 'ionic-angular'
import { PanGestureConfig } from 'ionic-angular/gestures/pan-gesture'
import { GesturePriorityPullRefresh, GesturePullRefresh } from '../../extend/getsure-config'
import { PullRefreshAnime } from './pull-refresh-anime'
import { PullRefreshGesture } from './pull-refresh-gesture'

@Component({
  selector: 'pull-refresh',
  templateUrl: 'pull-refresh.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PullRefreshComponent implements OnDestroy {
  @Output() onRefresh = new EventEmitter<undefined>()
  private isDestroy = false
  private animeCtrl: PullRefreshAnime
  private refreshGesture: PullRefreshGesture

  private _scrollContent: Content

  @Input()
  get scrollContent(): Content {
    return this._scrollContent
  }

  set scrollContent(v) {
    if (!v || v === this._scrollContent) return
    this._scrollContent = v
    this.setup()
  }

  _enable = true

  @Input()
  get enable() {
    return this._enable
  }

  set enable(v) {
    if (this._enable === v) return
    this._enable = v
    if (v) this.refreshGesture.listen()
    else this.refreshGesture.unlisten()
  }

  _config = new RefreshConfig(this.cdr)

  @Input()
  get config() {
    return this._config
  }

  set config(v) {
    if (v === this._config) return
    Object.assign(this._config, v)
    this._config.cdr = this.cdr
  }

  constructor(public plt: Platform, public cdr: ChangeDetectorRef, public rend2: Renderer2, public zone: NgZone,
              public ele: ElementRef, public domCtrl: DomController, public gestureCtrl: GestureController) {
  }

  ngOnDestroy(): void {
    this.isDestroy = true
    this.refreshGesture.destroy()
  }

  stopRefresh() {
    if (!this.refreshGesture || this.config.refreshStatus === RefreshStatusEnum.Ready || this.config.refreshStatus === RefreshStatusEnum.Hiding) return
    //隐藏刷新组件, 为了不会瞬间刷新完毕,等待动画播放 所以延迟
    setTimeout(() => {
      if (this.isDestroy || !this.animeCtrl) return
      this.animeCtrl.refreshHide()
    }, 300)
  }

  startRefresh() {
    if (this.isDestroy || !this.refreshGesture || !this.animeCtrl
      || this.config.refreshStatus === RefreshStatusEnum.Refreshing || this.config.refreshStatus === RefreshStatusEnum.Hiding) return
    this.animeCtrl.refreshing(false)
  }

  private setup() {
    //动画
    this.animeCtrl = new PullRefreshAnime(this.ele, this.rend2, this.config, this.emitRefresh.bind(this))
    //手势
    let refreshGestureOpt: PanGestureConfig = {
      threshold: 20,
      maxAngle: 75,
      direction: 'y',
      gesture: this.gestureCtrl.createGesture({
        name: GesturePullRefresh,
        priority: GesturePriorityPullRefresh,
        disableScroll: false
      }),
      domController: this.domCtrl,
      capture: false,
      zone: false,
      passive: true,
    }
    this.refreshGesture = new PullRefreshGesture(refreshGestureOpt, this.plt, this.config, this.scrollContent, this.animeCtrl)
    if (this.enable) this.refreshGesture.listen()
  }

  private emitRefresh() {
    this.zone.run(() => this.onRefresh.emit())
  }
}

export class RefreshConfig {
  cdr: ChangeDetectorRef
  maxThreshold: number = 256
  refreshThreshold: number = 156

  private _refreshStatus = RefreshStatusEnum.Ready

  get refreshStatus(): RefreshStatusEnum {
    return this._refreshStatus
  }

  set refreshStatus(v) {
    if (v !== this._refreshStatus) {
      this._refreshStatus = v
      this.cdr.detectChanges()
    }
  }

  constructor(cdr?: ChangeDetectorRef) {
    this.cdr = cdr
  }
}

export enum RefreshStatusEnum { Ready = 1, Move = 2, Refreshing = 3, Hiding = 4}
