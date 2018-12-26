import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from '../../components/components.module'
import { DirectivesModule } from '../../directives/directives.module'
import { MyPage } from './my'

@NgModule({
  declarations: [
    MyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPage),
    ComponentsModule,
    DirectivesModule,
  ],
})
export class MyPageModule {
}
