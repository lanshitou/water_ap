import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from '../../../components/components.module'
import { WeatherSearchPage } from './weather-search'

@NgModule({
  declarations: [
    WeatherSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(WeatherSearchPage),
    ComponentsModule,
  ],
})
export class WeatherSearchPageModule {
}
