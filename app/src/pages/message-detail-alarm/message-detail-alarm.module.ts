import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from "../../components/components.module"
import { DirectivesModule } from "../../directives/directives.module"
import { PipesModule } from "../../pipes/pipes.module"
import { MessageDetailAlarmPage } from './message-detail-alarm'

@NgModule({
  declarations: [
    MessageDetailAlarmPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageDetailAlarmPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ],
})
export class MessageDetailAlarmPageModule {
}
