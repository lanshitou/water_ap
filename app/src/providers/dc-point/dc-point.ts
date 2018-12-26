import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { map } from 'rxjs/operators'
import { ServerUrl } from '../../contract/url'
import { Api } from '../base/api'
import { dcPointValueConvertUtil } from '../entity/dc-point/convert/dc-point-convert'
import { DcPointValueEnum } from '../entity/dc-point/dc-point-alarm-status-enum'
import { WaringTypeEnum } from "../entity/waring/waring-enum"
import { SystemProvider } from '../system/system'
import { DcPointAlarmCE, DcPointAlarmConfigRE, DcPointAlarmRLE } from './entity/alarm'
import { DcPointHistoryItemRE, DcPointHistoryLE, DcPointHistoryRE } from './entity/history'

@Injectable()
export class DcPointProvider extends Api {
  static HistoryPointInterval = 60 * 60 * 1000

  //获取告警配置
  getDcPointAlarm(dcPointId: number, dcPointType: number): Observable<DcPointAlarmConfigRE> {
    return this.http.get(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/devices/${dcPointId}/warning/configuration`,
      {params: {dataType: dcPointType.toString()}})
      .apiOperate<DcPointAlarmConfigRE>(DcPointAlarmConfigRE)
      .pipe(
        map((v) => {
          if (v.alarms) {
            v.alarms.upperLimit = dcPointValueConvertUtil(v.dcPoint.type, v.alarms.upperLimit)
            v.alarms.lowerLimit = dcPointValueConvertUtil(v.dcPoint.type, v.alarms.lowerLimit)
          }
          return v
        })
      )
  }

  //配置告警值
  postDcPointAlarm(dcPointId: number, dcPointType: number, data?: DcPointAlarmRLE): Observable<DcPointAlarmConfigRE> {
    //构造数据
    let config: DcPointAlarmCE[] = []
    if (data) {
      let upper = new DcPointAlarmCE()
      let lower = new DcPointAlarmCE()
      upper.alarmType = WaringTypeEnum.UpperLimit
      upper.threshold = dcPointValueConvertUtil(dcPointType, Number(data.upperLimit), 'localToServer')
      lower.alarmType = WaringTypeEnum.LowerLimit
      lower.threshold = dcPointValueConvertUtil(dcPointType, Number(data.lowerLimit), 'localToServer')
      if (data.upperLimit !== undefined && data.upperLimit as any) config.push(upper)
      if (data.lowerLimit !== undefined && data.lowerLimit as any !== '') config.push(lower)
    }

    return this.http.post(`${ServerUrl}/iaSystems/${SystemProvider.checkedSystemId}/devices/${dcPointId}/warning/configuration`, config,
      {params: {'dataType': dcPointType.toString()}})
      .apiOperate<DcPointAlarmConfigRE>(DcPointAlarmConfigRE)
      .pipe(
        map((v) => {
          if (v.alarms) {
            v.alarms.upperLimit = dcPointValueConvertUtil(v.dcPoint.type, v.alarms.upperLimit)
            v.alarms.lowerLimit = dcPointValueConvertUtil(v.dcPoint.type, v.alarms.lowerLimit)
          }
          return v
        })
      )
  }

  //获取采集点数据
  getDcPointHistory(dcPointId: number, dcPointType: number, sDate: number, eDate: number, systemId?: number): Observable<DcPointHistoryLE[]> {
    return this.http.get(`${ServerUrl}/iaSystems/${systemId !== undefined ? systemId : SystemProvider.checkedSystemId}/devices/${dcPointId}/data_collections`,
      {
        params: {
          dataType: dcPointType.toString(),
          startDate: sDate.toString(),
          endDate: eDate.toString(),
        }
      })
      .apiOperate<DcPointHistoryRE>(DcPointHistoryRE)
      .pipe(
        map((v: DcPointHistoryRE) => {
          let result: DcPointHistoryLE[] = []

          //原始数据转换为MAP
          let map = new Map<number, number>()
          v.data.forEach((v: DcPointHistoryItemRE) => {
            map.set(v.time, v.value)
          })

          //一个小时一个间隔 遍历一次
          //处理数据点
          for (let time = sDate; time <= eDate; time += DcPointProvider.HistoryPointInterval) {
            let historyLE = new DcPointHistoryLE()
            let serverData = map.get(time)

            //不展示无效数据
            let convertValue = serverData === undefined ? DcPointValueEnum.Invalid : dcPointValueConvertUtil(dcPointType, serverData)
            historyLE.value = convertValue === DcPointValueEnum.Invalid ? undefined : convertValue
            historyLE.date = time
            result.push(historyLE)
          }

          return result
        })
      )
  }
}
