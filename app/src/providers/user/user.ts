import { HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'
import { ServerUrl } from '../../contract/url'
import { Api } from '../base/api'
import { UserInfoRE } from './entity/user-info'
import { UserOauthRE } from './entity/user-oauth'
import { VerifyCodeTypeEnum } from "./entity/verify-code-type"

@Injectable()
export class UserProvider extends Api {
  lastSendVcodeTel: string
  lastSendVcodeTime: number = 0
  lastSendVcodeTimeout: number

  //获取验证码
  getVcode(tel: string, type: VerifyCodeTypeEnum): Observable<undefined> {
    if (this.lastSendVcodeTel === tel && this.lastSendVcodeTime >= 0) {
      return Observable.create((v) => v.next(undefined))
    }
    return this.http.get(ServerUrl + '/user/vcode', {params: {mobile: tel, type: type.toString()}})
      .apiOperate<undefined>(undefined)
      .pipe(
        map((v) => {
          clearInterval(this.lastSendVcodeTimeout)
          this.lastSendVcodeTime = 60
          this.lastSendVcodeTimeout = setInterval((v) => {
            this.lastSendVcodeTime--
            if (this.lastSendVcodeTime <= 0) clearInterval(this.lastSendVcodeTimeout)
          }, 1000)
          return v
        })
      )
  }

  //注册
  register(mobile: string, password: string, vcode: string, nickName: string): Observable<UserOauthRE> {
    let formData = new HttpParams()
      .append('mobile', mobile)
      .append('password', password)
      .append('vcode', vcode)
      .append('nickName', nickName)
    return this.http.put(ServerUrl + '/user/oauth', formData)
      .apiOperate<UserOauthRE>(UserOauthRE)
  }

  //登录
  login(mobile: string, password: string): Observable<UserOauthRE> {
    let params = new HttpParams()
      .append('mobile', mobile)
      .append('password', password)
    return this.http.get(ServerUrl + '/user/oauth', {params: params, headers: {NoAppToken: 'true'}})
      .apiOperate<UserOauthRE>(UserOauthRE)
  }

  //登出
  loginOut(): Observable<undefined> {
    return this.http.delete(ServerUrl + '/user/oauth')
      .apiOperate<undefined>(undefined)
  }

  //忘记密码
  forgetPassword(mobile: string, password: string, vcode: string) {
    let formData = new HttpParams()
      .append('mobile', mobile)
      .append('newPassword', password)
      .append('vcode', vcode)
    return this.http.patch(ServerUrl + '/user/forget_pwd', formData)
      .apiOperate<undefined>(undefined)
  }

  //修改密码
  changePassword(oldP: string, newP: string) {
    let formData = new HttpParams()
      .append('oldPassword', oldP)
      .append('newPassword', newP)
    return this.http.patch(ServerUrl + '/user/update_pwd', formData)
      .apiOperate<undefined>(undefined)
  }

  //修改手机号
  changeTel(tel: string, vcode: string, password: string) {
    let formData = new HttpParams()
      .append('tel', tel)
      .append('vcode', vcode)
      .append('password', password)
    return this.http.patch(ServerUrl + '/user/tel', formData)
      .apiOperate<UserInfoRE>(UserInfoRE)
  }

  //获取用户信息
  getUserInfo() {
    return this.http.get(ServerUrl + '/user/info')
      .apiOperate<UserInfoRE>(UserInfoRE)
  }

  //更新用户信息
  updateUserInfo(v: any): Observable<undefined> {
    return this.http.patch(ServerUrl + '/user/info', v)
      .apiOperate<undefined>(undefined)
  }

  //更新头像
  updateUserHeader(file: File) {
    let params = new FormData()
    params.append('file', file)
    return this.http.post(ServerUrl + '/user/info/headerImage', params)
      .apiOperate<UserInfoRE>(UserInfoRE)
  }

  //用户服务协议
  getAgreement(): Observable<string> {
    return this.http.get(ServerUrl + '/user/agreement')
      .apiOperate<string>(String)
  }
}
