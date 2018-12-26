import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { ServerUrl } from '../../contract/url'
import { Api } from '../base/api'
import { SystemProvider } from '../system/system'
import { FarmlandRE } from './entity/farmland'

@Injectable()
export class FarmlandProvider extends Api {
  getFarmLand(id: number): Observable<FarmlandRE> {
    return this.http.get(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/farmlands/${id}`)
      .apiOperate<FarmlandRE>(FarmlandRE)
  }
}
