import { Injectable } from '@angular/core'
import { ServerUrl } from "../../contract/url"
import { Api } from "../base/api"
import { GetWaringTypeEnum } from "../entity/waring/waring-enum"
import { SystemProvider } from "../system/system"
import { WaringRE } from "./entity/waring"
import { WaringSummaryRE } from "./entity/waring-summary"

@Injectable()
export class WaringProvider extends Api {
  getWaringSummary(type: GetWaringTypeEnum, history: boolean, offset: number, limit: number) {
    return this.http.get(`${ServerUrl}/alarms`, {
      params: {
        iasId: SystemProvider.checkedSystemId ? SystemProvider.checkedSystemId.toString() : '',
        cleared: history ? '1' : '0',
        type: type.toString(),
        offset: offset.toString(),
        limit: limit.toString()
      }
    }).apiOperate<WaringSummaryRE[]>(WaringSummaryRE)
  }

  getWaringDetail(waringId: number) {
    return this.http.get(`${ServerUrl}/alarms/${waringId}`)
      .apiOperate<WaringRE>(WaringRE)
  }

  markWaringClear(waringId: number) {
    return this.http.post(`${ServerUrl}/alarms/${waringId}/clear`, {})
      .apiOperate<WaringRE>(WaringRE)
  }
}
