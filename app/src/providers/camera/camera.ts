import { HttpParams } from "@angular/common/http"
import { Injectable } from '@angular/core'
import { Observable } from "rxjs/Observable"
import { map } from "rxjs/operators"
import { OpenYs, ServerUrl } from "../../contract/url"
import { Api } from "../base/api"
import { SystemProvider } from "../system/system"
import { CameraAccessTokenRE, CameraRE } from "./entity/camera"

@Injectable()
export class CameraProvider extends Api {
  getCameraList(): Observable<CameraRE[]> {
    return this.http.get(`${ServerUrl}/iaSystem/${SystemProvider.checkedSystemId}/cameras/`)
      .apiOperate<CameraRE[]>(CameraRE)
  }

  getCameraAccessToken(): Observable<CameraAccessTokenRE> {
    return this.http.get(`${ServerUrl}/iaSystem/cameras/accessToken`)
      .apiOperate<CameraAccessTokenRE>(CameraAccessTokenRE)
  }

  ptzStart(accessToken: string, deviceSerial: string, chanelNo: number, direction: number, speed: number): Observable<undefined> {
    let formData = new HttpParams()
      .append('accessToken', accessToken)
      .append('deviceSerial', deviceSerial)
      .append('channelNo', chanelNo.toString())
      .append('direction', direction.toString())
      .append('speed', speed.toString())
    return this.http.post(`${OpenYs}/lapp/device/ptz/start`, formData, {headers: {NoAppToken: 'true'}})
      .apiOperate<undefined>(undefined, false)
      .pipe(map(this.handleError.bind(this)))
  }

  ptzStop(accessToken: string, deviceSerial: string, chanelNo: number, direction?: number): Observable<undefined> {
    let formData = new HttpParams()
      .append('accessToken', accessToken)
      .append('deviceSerial', deviceSerial)
      .append('channelNo', chanelNo.toString())

    if (direction) {
      formData = formData.append('direction', direction.toString())
    }

    return this.http.post(`${OpenYs}/lapp/device/ptz/stop`, formData, {headers: {NoAppToken: 'true'}})
      .apiOperate<undefined>(undefined, false)
      .pipe(map(this.handleError.bind(this)))
  }

  handleError(v: any): any {
    if (v.code !== '200') {
      throw  v
    } else return v.data
  }
}
