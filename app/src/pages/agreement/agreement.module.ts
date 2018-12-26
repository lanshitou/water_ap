import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from '../../components/components.module'
import { AgreementPage } from './agreement'

@NgModule({
  declarations: [
    AgreementPage,
  ],
  imports: [
    IonicPageModule.forChild(AgreementPage),
    ComponentsModule,
  ],
})
export class AgreementPageModule {
}
