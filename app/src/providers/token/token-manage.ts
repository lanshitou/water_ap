import { Lsk } from '../../contract/lsk'
import { StorageValue } from '../../extend/ionic/storage'
import { UserOauthRE } from '../user/entity/user-oauth'

export class TokenManageProvider {
  static ev: StorageValue<UserOauthRE>

  //保存登录信息
  static async saveUserOauth(userEntity: UserOauthRE) {
    TokenManageProvider.ev.value = userEntity
  }

  //清除登录信息
  static async cleanUserOauth() {
    TokenManageProvider.ev.value = undefined
  }
}

export async function tokenManageInit() {
  TokenManageProvider.ev = new StorageValue<UserOauthRE>(Lsk.Oauth, undefined, false, UserOauthRE)
  await TokenManageProvider.ev.isSync().toPromise()
}
