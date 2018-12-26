import { ILifecycleOwner } from "../../../extend/lifecycle/page-lifecycle-owner"

export class PlayerBase {
  isMute: boolean = false
  statusChangeCallback: (x: VideoStatusEnum) => undefined

  lifeOwner: ILifecycleOwner

  _status

  get status() {
    return this._status
  }

  set status(value) {
    if (status === value) return
    this._status = value
    if (this.statusChangeCallback) this.statusChangeCallback(this._status)
  }

  constructor(public el: HTMLElement, public src: string) {
  }

  async init(lifeOwner: ILifecycleOwner, callBack?: (x: VideoStatusEnum) => undefined) {
    this.statusChangeCallback = callBack
    this.lifeOwner = lifeOwner
  }

  async destroy() {
    this.statusChangeCallback = undefined
  }

  async play() {
  }

  async stop() {
  }

  async muted(t: boolean) {
    this.isMute = t
  }
}

export enum VideoStatusEnum {
  Init,
  Loading,
  Stop,
  ERROR,
  Play,
  Destroy,
}
