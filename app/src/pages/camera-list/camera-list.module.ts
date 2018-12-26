import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from "../../components/components.module"
import { CameraListPage } from './camera-list'

@NgModule({
  declarations: [
    CameraListPage,
  ],
  imports: [
    IonicPageModule.forChild(CameraListPage),
    ComponentsModule,
  ],
})
export class CameraListPageModule {
}
