import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from '../../../components/components.module'
import { PipesModule } from '../../../pipes/pipes.module'
import { IrrigateProcessingComponent } from "./component/irrigate-processing/irrigate-processing"
import { IrrigateTaskBlockComponent } from './component/irrigate-task-block/irrigate-task-block'
import { IrrigateTaskListComponent } from "./component/irrigate-task-list/irrigate-task-list"
import { IrrigatesTaskPage } from './irrigates-task'

@NgModule({
  declarations: [
    IrrigatesTaskPage,
    IrrigateTaskBlockComponent,
    IrrigateTaskListComponent,
    IrrigateProcessingComponent,
  ],
  imports: [
    IonicPageModule.forChild(IrrigatesTaskPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class IrrigatesTaskPageModule {
}
