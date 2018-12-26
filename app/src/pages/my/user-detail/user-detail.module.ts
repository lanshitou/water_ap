import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from "../../../components/components.module"
import { DirectivesModule } from '../../../directives/directives.module'
import { UserDetailPage } from './user-detail'

@NgModule({
  declarations: [
    UserDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(UserDetailPage),
    DirectivesModule,
    ComponentsModule,
  ],
})
export class UserDetailPageModule {
}
