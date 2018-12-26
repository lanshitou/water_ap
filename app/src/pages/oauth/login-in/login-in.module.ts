import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DirectivesModule } from '../../../directives/directives.module'
import { LoginInPage } from './login-in'

@NgModule({
  declarations: [
    LoginInPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginInPage),
    DirectivesModule,
  ],
})
export class LoginInPageModule {
}
