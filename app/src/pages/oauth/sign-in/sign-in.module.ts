import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DirectivesModule } from '../../../directives/directives.module'
import { SignInPage } from './sign-in'

@NgModule({
  declarations: [
    SignInPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInPage),
    DirectivesModule,
  ],
})
export class SignInPageModule {
}
