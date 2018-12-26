import { ILifecycleOwner } from "../../../extend/lifecycle/page-lifecycle-owner"
import { PlayerBase, VideoStatusEnum } from './player-base'

declare let JSMpeg: any

export class JsMpegPlayer extends PlayerBase {
  private player: any
  private canvas: HTMLCanvasElement

  async init(lifeOwner: ILifecycleOwner, callBack?: (x: VideoStatusEnum) => undefined) {
    if (this.status) return
    await super.init(lifeOwner, callBack)
    this.el.innerHTML = ''
    this.canvas = document.createElement('canvas')
    this.canvas.id = 'video'
    this.el.appendChild(this.canvas)

    this.player = new JSMpeg.Player(this.src, {canvas: this.canvas, loop: false, autoplay: false})
    this.player.autoplay = false
    this.status = VideoStatusEnum.Init
    this.stop()
  }

  async destroy() {
    if (this.status === VideoStatusEnum.Destroy) return
    this.player.destroy()
    this.el.innerHTML = ''
    this.status = VideoStatusEnum.Destroy
  }

  async play() {
    if (this.status === VideoStatusEnum.Play || this.status === VideoStatusEnum.Loading || this.status === VideoStatusEnum.Destroy) return
    this.player.play()
    this.status = VideoStatusEnum.Loading
    setTimeout(() => {
      this.canvas.style.visibility = ''
      this.status = VideoStatusEnum.Play
    }, 500)
  }

  async stop() {
    if (this.status === VideoStatusEnum.Stop || this.status === VideoStatusEnum.Destroy) return
    this.canvas.style.visibility = 'hidden'
    this.player.stop()
    this.status = VideoStatusEnum.Stop
  }

  async muted(t: boolean) {
    await super.muted(t)
    this.player.volume = t ? 0 : 1
  }
}
