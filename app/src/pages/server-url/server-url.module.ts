import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ServerUrlPage } from './server-url'

@NgModule({
  declarations: [
    ServerUrlPage,
  ],
  imports: [
    IonicPageModule.forChild(ServerUrlPage),
  ],
})
export class ServerUrlPageModule {
}
