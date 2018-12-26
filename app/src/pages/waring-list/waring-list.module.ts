import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from "../../components/components.module"
import { DirectivesModule } from "../../directives/directives.module"
import { PipesModule } from "../../pipes/pipes.module"
import { WaringListComponent } from "./component/waring-list/waring-list"
import { WaringListPage } from './waring-list'

@NgModule({
  declarations: [
    WaringListPage,
    WaringListComponent,
  ],
  imports: [
    IonicPageModule.forChild(WaringListPage),
    ComponentsModule,
    PipesModule,
    DirectivesModule
  ],
})
export class WaringListPageModule {
}
