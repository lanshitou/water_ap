import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { ComponentsModule } from "../../components/components.module"
import { DirectivesModule } from "../../directives/directives.module"
import { PipesModule } from "../../pipes/pipes.module"
import { ArticlePage } from './article'

@NgModule({
  declarations: [
    ArticlePage,
  ],
  imports: [
    IonicPageModule.forChild(ArticlePage),
    DirectivesModule,
    ComponentsModule,
    PipesModule,
  ],
})
export class ArticlePageModule {
}
