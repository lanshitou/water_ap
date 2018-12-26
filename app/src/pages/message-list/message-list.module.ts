import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from "../../components/components.module"
import { DirectivesModule } from "../../directives/directives.module"
import { PipesModule } from "../../pipes/pipes.module"
import { MessageListComponent } from './components/message-list/message-list'
import { MessageListPage } from './message-list'

@NgModule({
  declarations: [
    MessageListPage,
    MessageListComponent,
  ],
  imports: [
    IonicPageModule.forChild(MessageListPage),
    PipesModule,
    ComponentsModule,
    DirectivesModule,
  ],
})
export class MessageListPageModule {
}
