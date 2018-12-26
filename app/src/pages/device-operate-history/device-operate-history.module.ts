import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from "../../components/components.module"
import { PipesModule } from "../../pipes/pipes.module"
import { DeviceOperateHistoryPage } from './device-operate-history'

@NgModule({
  declarations: [
    DeviceOperateHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceOperateHistoryPage),
    ComponentsModule,
    PipesModule
  ],
})
export class DeviceOperateHistoryPageModule {
}
