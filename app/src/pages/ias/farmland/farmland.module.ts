import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from '../../../components/components.module'
import { DirectivesModule } from '../../../directives/directives.module'
import { PipesModule } from '../../../pipes/pipes.module'
import { IrrigateTaskLinearComponent } from './components/irrigate-task-linear/irrigate-task-linear'
import { ShakeIrrigateComponent } from "./components/shake-irrigate/shake-irrigate"
import { FarmlandPage } from './farmland'

@NgModule({
  declarations: [
    FarmlandPage,
    IrrigateTaskLinearComponent,
    ShakeIrrigateComponent,
  ],
  imports: [
    IonicPageModule.forChild(FarmlandPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ],
})
export class FarmlandPageModule {
}
