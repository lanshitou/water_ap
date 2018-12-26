import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DirectivesModule } from '../../../directives/directives.module'
import { AboutPage } from './about'

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    DirectivesModule,
  ],
})
export class AboutPageModule {
}
