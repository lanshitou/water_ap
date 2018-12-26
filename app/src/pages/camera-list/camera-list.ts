import { Component, ElementRef, Injector, Renderer2, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { of } from "rxjs/observable/of"
import { switchMap } from "rxjs/operators"
import { zipStatic } from "rxjs/operators/zip"
import { JoystickConfig } from "../../components/joystick/joystick"
import { VideoPlayerComponent } from "../../components/video-player/video-player"
import { CameraProvider } from "../../providers/camera/camera"
import { CameraAccessTokenRE, CameraRE } from "../../providers/camera/entity/camera"
import { CameraPreviewRE } from "../../providers/system/entity/preview"
import { ToastControllerExProvider } from "../../providers/toast-control-ex/toast-controler-ex"
import { BasePage } from "../base/base-page"

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-camera-list',
  templateUrl: 'camera-list.html',
})
export class CameraListPage extends BasePage {

  @ViewChild(VideoPlayerComponent) videoPlayerCmp: VideoPlayerComponent
  @ViewChild('left') leftEle: ElementRef
  @ViewChild('up') topEle: ElementRef
  @ViewChild('right') rightEle: ElementRef
  @ViewChild('down') downEle: ElementRef

  cameraList: CameraRE[]
  accessToken: CameraAccessTokenRE
  checkedVideo: CameraPreviewRE
  //云台参数
  joystickConfig: JoystickConfig
  ptzLastDirection: number
  isPtz = false
  pendPtzDirection = -1
  //当前的摄像头数据
  data: CameraRE

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public cameraProvider: CameraProvider, public rend2: Renderer2, public toastCtrl: ToastControllerExProvider) {
    super(injector)
    this.checkedVideo = this.navParams.data
  }

  onCreate() {
    this.getData()
  }

  //云台控制回调
  onJoystickEvent(event: string) {
    this.rend2.removeStyle(this.topEle.nativeElement, 'display')
    this.rend2.removeStyle(this.leftEle.nativeElement, 'display')
    this.rend2.removeStyle(this.rightEle.nativeElement, 'display')
    this.rend2.removeStyle(this.downEle.nativeElement, 'display')

    let direction: number = -1
    switch (event) {
      case 'up':
        this.rend2.setStyle(this.topEle.nativeElement, 'display', 'block')
        direction = 0
        break
      case 'down':
        this.rend2.setStyle(this.downEle.nativeElement, 'display', 'block')
        direction = 1
        break
      case 'left':
        this.rend2.setStyle(this.leftEle.nativeElement, 'display', 'block')
        direction = 2
        break
      case 'right':
        this.rend2.setStyle(this.rightEle.nativeElement, 'display', 'block')
        direction = 3
        break
    }
    this.ptzControl(direction)
  }

  ptzControl(direction: number) {
    if (this.isPtz) {
      this.pendPtzDirection = direction
      return
    } else {
      this.pendPtzDirection = -2
    }
    if (direction === -2) return
    let error = this.isPtzSupport(direction)
    if (error) {
      this.toastCtrl.show({message: error})
      return
    }
    this.isPtz = true
    this.cameraProvider.ptzStop(this.accessToken.accessToken, this.data.sn, 1, this.ptzLastDirection)
      .pipe(
        switchMap((v) => {
          if (direction !== -1) return this.cameraProvider.ptzStart(this.accessToken.accessToken, this.data.sn, 1, direction, 1)
          else return of(v)
        })
      )
      .bindLifecycle(this)
      .subscribe(
        () => {
          this.isPtz = false
          this.ptzControl(this.pendPtzDirection)
        },
        () => {
          this.isPtz = false
          this.ptzControl(this.pendPtzDirection)
        }
      )
  }

  onMonitoryClick(data: CameraRE) {
    if (data === this.data) return
    this.applyData(data)
  }

  //获取数据
  private getData() {
    this.loadErrorTipCmp.showLoading()
    let cameraAccessToken = this.cameraProvider.getCameraAccessToken()
    let cameraList = this.cameraProvider.getCameraList()
    zipStatic(cameraList, cameraAccessToken, (c, t) => {
      return {cameraList: c, cameraAccessToken: t}
    })
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          this.cameraList = v.cameraList
          this.accessToken = v.cameraAccessToken
          this.applyData()
          this.loadErrorTipCmp.showContent()
        },
        (v) => {
          this.loadErrorTipCmp.showError(v, this.getData.bind(this))
        }
      )
  }

  //应用数据
  private async applyData(data?: CameraRE) {
    if (data) {
      this.data = data
    }
    else {
      let rendVideo: CameraRE = this.cameraList[0]
      if (this.checkedVideo) {
        let find = this.cameraList.find((v) => v.id === this.checkedVideo.id)
        if (find) rendVideo = find
      }
      this.data = rendVideo
    }

    await this.setupVideo()
    this.setupJoystick()
  }

  //设置云台控制
  private setupJoystick() {
    this.joystickConfig = new JoystickConfig()
    this.joystickConfig.lockY = this.data.capability.ptzLeftRight !== '1'
    this.joystickConfig.lockX = this.data.capability.ptzTopBottom !== '1'
  }

  //设置视频流
  private async setupVideo() {
    await this.videoPlayerCmp.setupSteam(this.data.hlsHD, this.data.ws)
    this.videoPlayerCmp.playByWifi()
  }

  private isPtzSupport(direction: number) {
    switch (direction) {
      case 0: //t
      case 1: //b
        return this.data.capability.ptzTopBottom !== '1' ? '该设备不支持上下控制' : ''
      case 2: //l
      case 3: //r
        return this.data.capability.ptzTopBottom !== '1' ? '该设备不支持左右控制' : ''
      case 10: //+
      case 11: //-
        return this.data.capability.ptzZoom !== '1' ? '该设备不支持缩放控制' : ''
      default:
        return ''
    }
  }
}
