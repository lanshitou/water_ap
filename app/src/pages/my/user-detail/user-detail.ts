import { Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { ActionSheetController, IonicPage, NavController, NavParams } from 'ionic-angular'
import { isIOS } from "../../../extend/ionic/isPlatform"
import { ToastControllerExProvider } from '../../../providers/toast-control-ex/toast-controler-ex'
import { UserInfoRE } from '../../../providers/user/entity/user-info'
import { UserProvider } from "../../../providers/user/user"
import { BasePage } from '../../base/base-page'

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-user-detail',
  templateUrl: 'user-detail.html',
})
export class UserDetailPage extends BasePage {
  data: UserInfoRE

  @ViewChild('#inputGallery', {read: ElementRef}) inputGalleryEle: ElementRef
  @ViewChild('#inputCamera', {read: ElementRef}) inputCameraEle: ElementRef

  constructor(public navCtrl: NavController, public navParams: NavParams, protected injector: Injector,
              public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastControllerExProvider, public userProvider: UserProvider) {
    super(injector)
    this.data = this.navParams.data
  }

  updateImage() {
    let element = this.inputGalleryEle.nativeElement as HTMLInputElement
    this.userProvider.updateUserHeader(element.files[0])
      .loadingOperate()
      .subscribe(
        (v) => {
          Object.assign(this.data, v)
          element.value = ''
        },
        (v) => {
          this.toastCtrl.show({message: v.message})
          element.value = ''
        }
      )
  }

  onEditImageHeaderClick() {
    if (isIOS()) {
      let nativeElement = this.inputGalleryEle.nativeElement as HTMLInputElement
      nativeElement.click()
    } else {
      this.actionSheetCtrl.create({
        title: '选择图片来源',
        enableBackdropDismiss: true,
        buttons: [
          {
            icon: 'photos',
            text: '相册',
            handler: () => {
              let nativeElement = this.inputGalleryEle.nativeElement as HTMLInputElement
              nativeElement.click()
            }
          },
          {
            icon: 'camera',
            text: '相机',
            handler: () => {
              let nativeElement = this.inputCameraEle.nativeElement as HTMLInputElement
              nativeElement.click()
            }
          },
          {
            icon: 'close',
            text: '取消',
            role: 'cancel'
          }
        ]
      }).present()
    }
  }
}
