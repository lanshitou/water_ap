import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { IrrigationTaskDurationPage } from './irrigation-task-duration'

@NgModule({
  imports: [IonicPageModule.forChild(IrrigationTaskDurationPage)],
  declarations: [
    IrrigationTaskDurationPage,
  ]
})
export class IrrigationTaskDurationModule {
}
