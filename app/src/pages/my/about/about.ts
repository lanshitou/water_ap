import { Component, Injector } from '@angular/core'
import { IonicPage } from 'ionic-angular'
import { Copyright, Version } from '../../../contract/about'
import { BasePage } from '../../base/base-page'

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage extends BasePage {
  version: string
  copyright: string

  constructor(protected injector: Injector) {
    super(injector)
    this.version = Version
    this.copyright = Copyright
  }

}
