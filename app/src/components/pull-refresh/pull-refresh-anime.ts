import { ElementRef, Renderer2 } from '@angular/core'
import * as anime from 'animejs'
import { AnimeInstance } from 'animejs'
import { RefreshConfig, RefreshStatusEnum } from './pull-refresh'

export class PullRefreshAnime {
  pullAnimeCtr: AnimeInstance
  scaleAnimeCtr: AnimeInstance
  animeDuration = this.config.maxThreshold * 2

  constructor(public ele: ElementRef, public rend2: Renderer2, public config: RefreshConfig,
              public onRefresh: Function) {
    this.createAnime()
  }

  /**
   * 刷新中动画
   */
  refreshing(emit: boolean = true) {
    if (this.config.refreshStatus === RefreshStatusEnum.Refreshing || this.config.refreshStatus === RefreshStatusEnum.Hiding) return
    this.config.refreshStatus = RefreshStatusEnum.Refreshing
    if (emit) this.onRefresh()
    if (this.pullAnimeCtr.progress > ((this.config.refreshThreshold / this.config.maxThreshold) * 100)) {
      if (!this.pullAnimeCtr.reversed) this.pullAnimeCtr.reverse()
      this.pullAnimeCtr.play()
    }
    else {
      this.pullAnimeCtr.seek((this.config.refreshThreshold / this.config.maxThreshold) * this.animeDuration)
      this.pullAnimeCtr.pause()
    }
  }

  /**
   * 刷新结束
   * 清除状态值 允许滚动
   */
  refreshHide() {
    if (this.config.refreshStatus === RefreshStatusEnum.Ready || this.config.refreshStatus === RefreshStatusEnum.Hiding) return
    let animeCtrl: AnimeInstance
    if (this.config.refreshStatus === RefreshStatusEnum.Refreshing) {
      animeCtrl = this.scaleAnimeCtr
      this.rend2.removeStyle(this.ele.nativeElement.querySelector('.container'), 'transform')
      this.rend2.setStyle(this.ele.nativeElement, 'top', this.config.refreshThreshold - 52 + 'px')
    }
    else {
      animeCtrl = this.pullAnimeCtr
      if (!animeCtrl.reversed) animeCtrl.reverse()
    }

    animeCtrl.play()
    this.config.refreshStatus = RefreshStatusEnum.Hiding
    setTimeout(() => {
      this.rend2.removeStyle(this.ele.nativeElement, 'top')
      this.resetAnime()
      this.config.refreshStatus = RefreshStatusEnum.Ready
    }, this.animeDuration)
  }

  /**
   * 初始化动画
   */
  resetAnime() {
    if (this.pullAnimeCtr && this.pullAnimeCtr.reversed) this.pullAnimeCtr.reverse()
    this.scaleAnimeCtr.seek(0)
    this.pullAnimeCtr.seek(0)
    this.scaleAnimeCtr.pause()
    this.pullAnimeCtr.pause()
  }

  /**
   * 根据配置创建动画
   */
  private createAnime() {
    let targets = this.ele.nativeElement.querySelector('.container')
    this.pullAnimeCtr = anime({
      targets: targets,
      translateY: {
        value: [0, this.config.maxThreshold],
        duration: this.animeDuration
      },
      rotate: {
        value: [0, 360 / (this.config.refreshThreshold / this.config.maxThreshold)],
        duration: this.animeDuration
      },
      opacity: {
        value: [0, 1],
        duration: this.config.refreshThreshold / this.config.maxThreshold * this.animeDuration
      },
      autoplay: false,
      easing: 'linear',
      elasticity: 0,
      update: this.pullUpdate.bind(this)
    })

    this.scaleAnimeCtr = anime({
      targets: targets,
      scale: [1, 0],
      rotate: 180,
      opacity: [1, 0],
      duration: this.animeDuration,
      autoplay: false,
      easing: 'linear',
      elasticity: 0,
    })
  }

  private pullUpdate(e) {
    if (this.config.refreshStatus === RefreshStatusEnum.Refreshing &&
      e.progress < ((this.config.refreshThreshold / this.config.maxThreshold) * 100)) {
      e.seek((this.config.refreshThreshold / this.config.maxThreshold) * this.animeDuration)
      e.pause()
    }
  }
}
