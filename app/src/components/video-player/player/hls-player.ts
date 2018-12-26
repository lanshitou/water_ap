import * as Hls from 'hls.js'
import { ILifecycleOwner } from "../../../extend/lifecycle/page-lifecycle-owner"
import { PlayerBase, VideoStatusEnum } from './player-base'

export class HlsPlayer extends PlayerBase {
  private video: HTMLVideoElement
  private hls: Hls

  async init(lifeOwner: ILifecycleOwner, callBack?: (x: VideoStatusEnum) => undefined) {
    if (this.status) return
    await super.init(lifeOwner, callBack)
    this.el.innerHTML = ''
    this.video = document.createElement('video')
    this.video.id = 'video'
    this.el.appendChild(this.video)
    this.hls = new Hls({maxBufferLength: 5, liveSyncDurationCount: 2, liveDurationInfinity: true})

    this.video.addEventListener('volumechange', (v) => {
      this.isMute = this.video.muted
    }, {capture: true, passive: true})

    this.video.addEventListener('playing', (v) => {
      this.status = VideoStatusEnum.Play
      this.video.style.visibility = ''
    }, {capture: true, passive: true})

    this.video.addEventListener('pause', (v) => {
      this.status = VideoStatusEnum.Stop
      this.video.style.visibility = 'hidden'
    }, {capture: true, passive: true})

    this.hls.on(Hls.Events.ERROR, () => {
      this.status = VideoStatusEnum.ERROR
    })

    this.status = VideoStatusEnum.Init
    await this.stop()
  }

  async destroy() {
    if (this.status === VideoStatusEnum.Destroy) return
    this.hls.destroy()
    this.el.innerHTML = ''
  }

  async play() {
    if (this.status === VideoStatusEnum.Play || this.status === VideoStatusEnum.Loading || this.status === VideoStatusEnum.Destroy) return
    this.status = VideoStatusEnum.Loading

    this.hls.attachMedia(this.video)
    this.hls.loadSource(this.src)

    this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this.video.play()
    })
  }

  async stop() {
    if (this.status === VideoStatusEnum.Stop || this.status === VideoStatusEnum.Destroy) return
    this.video.pause()
    this.hls.stopLoad()
    this.hls.detachMedia()
    this.status = VideoStatusEnum.Stop
  }

  async muted(t: boolean) {
    await super.muted(t)
    this.video.muted = t
  }
}
