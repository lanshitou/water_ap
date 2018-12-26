import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { SignInDetailPage } from './sign-in-detail'

@NgModule({
  declarations: [
    SignInDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInDetailPage),
  ],
})
export class SignInDetailPageModule {
}
