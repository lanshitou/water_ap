import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { LoadStatusAnimeComponent } from './load-status-anime/load-status-anime'
import { LoadingPageComponent } from './loading-page'

@NgModule({
  imports: [IonicPageModule.forChild(LoadingPageComponent)],
  declarations: [
    LoadingPageComponent,
    LoadStatusAnimeComponent
  ]
})
export class LoadingPageModule {
}
