import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from '../../components/components.module'
import { DirectivesModule } from '../../directives/directives.module'
import { PipesModule } from '../../pipes/pipes.module'

import { MessagePage } from './message'

@NgModule({
  declarations: [
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ],
})
export class MessagePageModule {
}
