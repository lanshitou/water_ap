import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { NickNameEditPage } from './nick-name-edit'

@NgModule({
  declarations: [
    NickNameEditPage,
  ],
  imports: [
    IonicPageModule.forChild(NickNameEditPage),
  ],
})
export class NickNameEditPageModule {
}
