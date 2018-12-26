import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { TelChangePage } from './tel-change'

@NgModule({
  declarations: [
    TelChangePage,
  ],
  imports: [
    IonicPageModule.forChild(TelChangePage),
  ],
})
export class TelChangePageModule {
}
