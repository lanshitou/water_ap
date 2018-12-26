import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  Renderer2,
  ViewChild
} from '@angular/core'
import { Network } from "@ionic-native/network"
import { NavController, NavParams, Platform } from 'ionic-angular'
import { BaseComponent } from '../base/base-component'
import { HlsPlayer } from './player/hls-player'
import { JsMpegPlayer } from "./player/js-mpeg-player"
import { PlayerBase, VideoStatusEnum } from './player/player-base'

@Component({
  selector: 'video-player',
  templateUrl: 'video-player.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoPlayerComponent extends BaseComponent {

  @ViewChild('player', {read: ElementRef}) playerEl: ElementRef //容器
  isFullScreen: boolean = false //全屏
  videoTip: string = '' //错误提示
  private playerControl: PlayerBase //控制器

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public rend2: Renderer2, public platform: Platform, public ele: ElementRef, public cdr: ChangeDetectorRef,
              public netWork: Network) {
    super(injector)
  }

  onCreate() {
    //全屏状态改变
    this.platform.registerListener(this.ele.nativeElement, 'webkitfullscreenchange', () => {
      if (document.webkitIsFullScreen) {
        this.isFullScreen = true
        this.rend2.addClass(this.ele.nativeElement, 'full-screen')
      }
      else {
        this.isFullScreen = false
        this.rend2.removeClass(this.ele.nativeElement, 'full-screen')
      }
    }, {capture: true, zone: true, passive: true})

    this.netWork.onDisconnect().subscribe(() => {
      this.setErrorTip('网络连接已断开,请检查网络状态')
    })

    this.netWork.onConnect().subscribe(() => {
      if (this.netWork.type === 'cellular') this.setErrorTip('您当前正在使用蜂窝数据,可能会产生流量费用。需要继续观看请点击这里')
      else this.playPause(true)
    })
  }

  onDestroy() {
    if (this.playerControl) this.playerControl.destroy()
  }

  //返回键先退出全屏
  canBackButton(): boolean {
    if (document.webkitIsFullScreen) {
      document.webkitExitFullscreen()
      return false
    }
    else {
      return super.canBackButton()
    }
  }

  //全屏非全屏切换
  expendNormal() {
    let elem = this.ele.nativeElement as HTMLElement
    if (document.webkitIsFullScreen) document.webkitCancelFullScreen()
    else elem.webkitRequestFullscreen()
  }

  //错误重试
  onVideoContainerClick() {
    if (this.videoTip === '') return
    this.playPause(true)
  }

  //静音
  mute() {
    if (this.playerControl) this.playerControl.muted(!this.playerControl.isMute)
  }

  //设置错误提示
  async setErrorTip(t: string) {
    await this.playPause(false)
    this.videoTip = t
    this.cdr.detectChanges()
  }

  //主动播放暂停
  async playPause(play: boolean) {
    if (this.playerControl) {
      if (this.netWork.type === 'none') {
        await this.setErrorTip('无法连接到互联网,请检查您的网络')
        return
      }
      if (play) await this.playerControl.play()
      else await this.playerControl.stop()
    }
  }

  playByWifi() {
    if (this.netWork.type === 'cellular') this.setErrorTip('您当前正在使用蜂窝数据,可能会产生流量费用。需要继续观看请点击这里')
    else this.playPause(true)
  }

  //设置流地址
  async setupSteam(hlsSteam?: string, wsSteam?: string) {
    if (this.playerControl) await this.playerControl.destroy()
    if (!hlsSteam && !wsSteam) return
    if (wsSteam) this.playerControl = new JsMpegPlayer(this.playerEl.nativeElement, wsSteam)
    else this.playerControl = new HlsPlayer(this.playerEl.nativeElement, hlsSteam)
    await this.playerControl.init(this, this.onPlayStatusChangeHandler.bind(this))
  }

  private onPlayStatusChangeHandler(status: VideoStatusEnum) {
    switch (status) {
      case VideoStatusEnum.ERROR:
        this.videoTip = '读取视频流失败,点击重试'
        break
      case VideoStatusEnum.Init:
        this.videoTip = ''
        break
      case VideoStatusEnum.Loading:
        this.videoTip = ''
        break
      case VideoStatusEnum.Play:
        this.videoTip = ''
        break
    }
    this.cdr.detectChanges()
  }
}
