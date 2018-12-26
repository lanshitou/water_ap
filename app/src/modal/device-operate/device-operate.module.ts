import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from "../../components/components.module"
import { DirectivesModule } from "../../directives/directives.module"
import { PipesModule } from "../../pipes/pipes.module"
import { DeviceOperatePage } from "./device-operate"

@NgModule({
  imports: [
    IonicPageModule.forChild(DeviceOperatePage),
    ComponentsModule,
    PipesModule,
    DirectivesModule,
  ],
  declarations: [
    DeviceOperatePage,
  ],
})
export class DeviceOperate {
}
