import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from "../../components/components.module"
import { DirectivesModule } from "../../directives/directives.module"
import { PipesModule } from "../../pipes/pipes.module"
import { MessageDetailOfflinePage } from './message-detail-offline'

@NgModule({
  declarations: [
    MessageDetailOfflinePage,
  ],
  imports: [
    IonicPageModule.forChild(MessageDetailOfflinePage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ],
})
export class MessageDetailOfflinePageModule {
}
