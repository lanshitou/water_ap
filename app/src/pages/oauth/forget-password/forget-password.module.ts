import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DirectivesModule } from '../../../directives/directives.module'
import { ForgetPasswordPage } from './forget-password'

@NgModule({
  declarations: [
    ForgetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPasswordPage),
    DirectivesModule,
  ],
})
export class ForgetPasswordPageModule {
}
