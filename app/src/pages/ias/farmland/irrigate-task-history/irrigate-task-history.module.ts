import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from '../../../../components/components.module'
import { PipesModule } from '../../../../pipes/pipes.module'
import { IrrigateTaskHistoryPage } from './irrigate-task-history'

@NgModule({
  declarations: [
    IrrigateTaskHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(IrrigateTaskHistoryPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class IrrigateTaskHistoryPageModule {
}
