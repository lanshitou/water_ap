import { Component } from '@angular/core'
import { IonicPage } from 'ionic-angular'
import { Copyright, CustomServiceTel, WorkTime } from '../../contract/about'

@IonicPage({defaultHistory: ['']})
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {
  tel: string
  workTime: string
  copyright: string

  constructor() {
    this.tel = CustomServiceTel
    this.workTime = WorkTime
    this.copyright = Copyright
  }

}
