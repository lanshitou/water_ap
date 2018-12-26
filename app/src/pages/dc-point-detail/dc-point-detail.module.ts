import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from '../../components/components.module'
import { PipesModule } from '../../pipes/pipes.module'
import { DcPointDetailPage } from './dc-point-detail'

@NgModule({
  declarations: [
    DcPointDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DcPointDetailPage),
    ComponentsModule,
    PipesModule,
  ],
})
export class DcPointDetailPageModule {
}
