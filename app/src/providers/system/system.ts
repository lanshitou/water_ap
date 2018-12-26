import { HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { of } from "rxjs/observable/of"
import { map, switchMap } from 'rxjs/operators'
import { ServerUrl } from '../../contract/url'
import { Api } from '../base/api'
import { LocalConfigProvider } from "../local-config/local-config"
import { SystemPreviewRE } from './entity/preview'
import { ModeEnum, SystemsRE } from './entity/systems'

@Injectable()
export class SystemProvider extends Api {
  static checkedSystemId: number
  static systemList: SystemsRE[]

  constructor(public localConfig: LocalConfigProvider) {
    super()
  }

  //切换选中的系统
  checkedSystem(iaSystemId: number) {
    SystemProvider.checkedSystemId = iaSystemId
    this.localConfig.lastSelectSystemEv.value = iaSystemId
  }

  //获取全部系统列表
  getSystems() {
    if (SystemProvider.systemList) {
      return of(SystemProvider.systemList)
    }
    else {
      return this.http.get(ServerUrl + '/iaSystems')
        .apiOperate<SystemsRE[]>(SystemsRE)
        .pipe(
          map((v: SystemsRE[]) => {
            if (v) {
              SystemProvider.systemList = v
              //给一个选中的系统 id 如果本地缓存的 系统id 已经不存在 , 那么用第一个
              let filter = v.filter((i) => this.localConfig.lastSelectSystemEv.value === i.id)
              this.checkedSystem(filter.length > 0 ? filter[0].id : v[0].id)
            }
            return v
          })
        )
    }
  }

  //切换系统模式
  postChangeMode(mode: ModeEnum) {
    let formData = new HttpParams()
      .append('mode', mode.toString())
    return this.http.post(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/mode`, formData)
      .apiOperate<undefined>(undefined)
  }

  //获取园区详情
  getSystemPreview() {
    //确保先拿到系统id
    if (SystemProvider.checkedSystemId === undefined) {
      return this.getSystems().pipe(switchMap(() => {
        return this.safeGetSystemPreview()
      }))
    }
    else {
      return this.safeGetSystemPreview()
    }
  }

  private safeGetSystemPreview() {
    return this.http.get(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/summary`)
      .apiOperate<SystemPreviewRE>(SystemPreviewRE)
  }
}
