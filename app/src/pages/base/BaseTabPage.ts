import { Injector, OnInit } from '@angular/core'
import { DataStatusEnum } from '../../extend/data-help/data-status-enum'
import { considerExitApp } from "../../extend/ionic/exit-app"
import { TokenManageProvider } from '../../providers/token/token-manage'
import { UserOauthRE } from '../../providers/user/entity/user-oauth'
import { BasePage } from './base-page'

export class BaseTabPage extends BasePage implements OnInit {
  constructor(protected injector: Injector) {
    super(injector)
  }

  ngOnInit(): void {
    if (!TokenManageProvider.ev.value) this.toOauthPage()
  }

  onOauthStateChange(entity: UserOauthRE | undefined): void {
    super.onOauthStateChange(entity)
    if (entity) this.getData(DataStatusEnum.Content)
  }

  canBackButton(): boolean {
    return super.canBackButton() && considerExitApp()
  }

  getData(status: DataStatusEnum) {
  }
}
