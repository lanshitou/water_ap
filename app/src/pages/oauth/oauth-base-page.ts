import { UserOauthRE } from '../../providers/user/entity/user-oauth'
import { BasePage } from '../base/base-page'

export class OauthBasePage extends BasePage {
  onOauthStateChange(entity: UserOauthRE | undefined): void {
  }
}
