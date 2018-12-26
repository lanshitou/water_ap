import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { ServerUrl } from '../../contract/url'
import { Api } from '../base/api'
import { DeviceRE } from '../entity/device/device'
import { SystemProvider } from '../system/system'
import { DeviceOperateArgLE } from './entity/arg'
import { DeviceOperateHistoryRE } from "./entity/device-operate-history"


@Injectable()
export class DeviceProvider extends Api {
  sharkDeviceId: number
  sharkIrrigateId: number
  sharkDeviceType: number

  postDeviceOperate(id: number, arg: DeviceOperateArgLE): Observable<DeviceRE> {
    return this.http.post(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/devices/${id}/operate`, arg)
      .apiOperate <DeviceRE>(DeviceRE)
  }

  getDeviceOperateHistory(id: number, offset: number, limit: number) {
    return this.http.get(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/devices/${id}/operate/history`,
      {
        params: {
          type: '1',
          offset: offset.toString(),
          limit: limit.toString()
        }
      })
      .apiOperate <DeviceOperateHistoryRE[]>(DeviceOperateHistoryRE)
  }
}
