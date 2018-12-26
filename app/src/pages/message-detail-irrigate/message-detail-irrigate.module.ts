import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from "../../components/components.module"
import { DirectivesModule } from "../../directives/directives.module"
import { PipesModule } from "../../pipes/pipes.module"
import { MessageDetailIrrigatePage } from './message-detail-irrigate'

@NgModule({
  declarations: [
    MessageDetailIrrigatePage,
  ],
  imports: [
    IonicPageModule.forChild(MessageDetailIrrigatePage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ],
})
export class MessageDetailIrrigatePageModule {
}
