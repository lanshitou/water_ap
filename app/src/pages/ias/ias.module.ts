import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from '../../components/components.module'
import { DirectivesModule } from '../../directives/directives.module'
import { PipesModule } from "../../pipes/pipes.module"
import { CameraPreviewComponent } from "./components/camera-preview/camera-preview"
import { FarmlandComponent } from "./components/farmland/farmland"
import { IasPage } from './ias'

@NgModule({
  declarations: [
    IasPage,
    FarmlandComponent,
    CameraPreviewComponent,
  ],
  imports: [
    IonicPageModule.forChild(IasPage),
    ComponentsModule,
    DirectivesModule,
    PipesModule,
  ],
  providers: []
})
export class IasPageModule {
}
