import { animate, keyframes, style, transition, trigger } from '@angular/animations'
import { Component, ElementRef, Injector, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { ErrorCode } from '../../contract/error-code'
import { getDatePipe } from "../../extend/date-transform"
import { LoadingStatusEnum } from '../../modal/loading-page/load-status-anime/load-status-anime'
import { LoadingPageConfig, LoadingPageController } from '../../modal/loading-page/loading-page-controller'
import { getServerTime } from '../../providers/base/base-interceptor'
import { DcPointProvider } from '../../providers/dc-point/dc-point'
import { DcPointAlarmRLE } from '../../providers/dc-point/entity/alarm'
import { DcPointHistoryLE } from '../../providers/dc-point/entity/history'
import { DcPointRE } from '../../providers/entity/dc-point/dc-point'
import {
  DcPointValueEnum,
  getDcPointMaxValue,
  getDcPointMinValue
} from '../../providers/entity/dc-point/dc-point-alarm-status-enum'
import { WaringTypeEnum } from "../../providers/entity/waring/waring-enum"
import { ToastControllerExProvider } from '../../providers/toast-control-ex/toast-controler-ex'
import { BasePage } from '../base/base-page'
import { ChartConfigHelp } from './chart-config-help'

@IonicPage({defaultHistory: ['IasPage']})
@Component({
  selector: 'page-dc-point-detail',
  templateUrl: 'dc-point-detail.html',
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [ // 进场动画
        style({transform: 'translateY(-100%)'}),
        animate('300ms 300ms', keyframes([
          style({transform: 'translateY(-100%)', offset: 0}), // 元素高度0，元素隐藏(透明度为0)，动画帧在0%
          style({transform: 'translateY(0%)', offset: 1}) // 200ms后高度自适应展开，元素展开(透明度为1)，动画帧在100%
        ]))
      ]),
      transition('* => void', [
        animate('300ms 300ms', keyframes([
          style({transform: 'translateY(0%)', offset: 0}), // 与之对应，让元素从显示到隐藏一个过渡
          style({transform: 'translateY(-100%)', offset: 1})
        ]))
      ]),
    ])]
})
export class DcPointDetailPage extends BasePage {
  static Minute = 60 * 1000
  static Hour = 60 * DcPointDetailPage.Minute
  static DAY = 24 * DcPointDetailPage.Hour

  invalid = DcPointValueEnum.Invalid

  today = getDatePipe().transform(getServerTime(), 'yyyy-MM-dd')

  dcPointCmpApplyValue: Function
  dcPoint: DcPointRE //传感器传过来的数据
  alarmType: WaringTypeEnum //现在处于的告警状态

  alarmData: DcPointAlarmRLE //告警数据
  formAlarmData: DcPointAlarmRLE //告警数据
  historysData: DcPointHistoryLE[] //历史曲线数据

  ignoreWarn = false //是否忽略警告
  selectDate = 1 //查看几天前的数据
  alarmDataStatus = 0 //0 没有获取 , 1 获取中 , 2获取失败, 3 成功

  upperLimitAlarm: number
  lowerLimitAlarm: number

  chartHelp: ChartConfigHelp = new ChartConfigHelp()
  @ViewChild('chart') chartEle: ElementRef
  @ViewChild('f') formCtrl: FormControl

  constructor(protected injector: Injector, public navCtrl: NavController, public navParams: NavParams,
              public dcPointProvider: DcPointProvider, public toastCtrl: ToastControllerExProvider,
              public loadPageCtrl: LoadingPageController) {
    super(injector)
    this.setDcPointData(this.navParams.data['data'])
    this.dcPointCmpApplyValue = this.navParams.data['applyValue']
  }

  onCreate() {
    //创建表格和配置
    this.chartHelp.createAndConfig(this.dcPoint.type, this.chartEle.nativeElement)
    this.getData()
  }

  onLeave() {
    this.dcPointCmpApplyValue(this.dcPoint)
  }

  //切换历史数据时间
  onHistoryDateChange(dateCount: number) {
    let endDate: number
    let serverTime = getServerTime()
    serverTime = serverTime - (serverTime % DcPointDetailPage.Hour)
    if (dateCount > 1) {
      let date = new Date(this.today)
      endDate = date.getTime() + date.getTimezoneOffset() * DcPointDetailPage.Minute + DcPointDetailPage.DAY - DcPointDetailPage.Hour
    }
    else {
      endDate = serverTime
    }

    this.getHistoryData(endDate - DcPointDetailPage.DAY * dateCount, endDate)
  }

  onSubmitAlarmConfig(clean?: boolean) {
    if (!clean) {
      //下限大于上限
      if ((!this.formAlarmData.upperLimit || this.formAlarmData.upperLimit as any === '') &&
        (!this.formAlarmData.lowerLimit || this.formAlarmData.lowerLimit as any === '')) {
        this.toastCtrl.show({message: '至少一个阈值,如果想取消 请按取消告警'})
        return
      }
      if (this.formAlarmData.lowerLimit > this.formAlarmData.upperLimit && this.formAlarmData.upperLimit as any !== '') {
        this.toastCtrl.show({message: '告警的下限值不能大于上限值'})
        return
      } else if (this.formAlarmData.lowerLimit < this.lowerLimitAlarm) {
        this.toastCtrl.show({message: '告警的下限值不能小于' + this.lowerLimitAlarm})
        return
      } else if (this.formAlarmData.upperLimit > this.upperLimitAlarm) {
        this.toastCtrl.show({message: '告警的上限值不能大于' + this.upperLimitAlarm})
        return
      }
    }
    let loadingPageConfig = new LoadingPageConfig()
    this.loadPageCtrl.present(loadingPageConfig).then(() => {
      this.dcPointProvider.postDcPointAlarm(this.dcPoint.id, this.dcPoint.type, clean ? undefined : this.formAlarmData)
        .bindLifecycle(this)
        .subscribe(
          (v) => {
            this.setDcPointData(v.dcPoint)
            this.chartHelp.chartConfig(v.alarms)
            this.formCtrl.reset(this.alarmData)
            this.alarmData = v.alarms
            if (!clean) Object.assign(this.formAlarmData, v.alarms)
            else this.formAlarmData = undefined
            loadingPageConfig.change(LoadingStatusEnum.Succeed, clean ? '取消告警成功' : '更改阈值成功', 2000)
          },
          (v) => {
            loadingPageConfig.change(LoadingStatusEnum.Failed, v.message, 3000)
          }
        )
    })
  }

  //配置新的告警值
  configNewAlarm() {
    this.formAlarmData = new DcPointAlarmRLE()
  }

  private getData() {
    this.onHistoryDateChange(1)
    this.getDcPointConfigData()
  }

  //刷新传感器信息
  private getDcPointConfigData() {
    if (!this.dcPoint.configWarn) return
    this.alarmDataStatus = 1

    this.dcPointProvider.getDcPointAlarm(this.dcPoint.id, this.dcPoint.type)
      .bindLifecycle(this)
      .subscribe(
        (v) => {
          //变更数据
          this.setDcPointData(v.dcPoint)
          this.alarmData = v.alarms
          this.formAlarmData = this.alarmData
          //更换上下限使用新配置
          this.chartHelp.chartConfig(this.alarmData)
          this.alarmDataStatus = 3
        },
        (v) => {
          if (v.code === ErrorCode.Empty) this.alarmDataStatus = 3
          else this.alarmDataStatus = 2
        }
      )
  }

  //获取历史数据
  private getHistoryData(startDate: number, endDate: number) {
    let history = this.dcPointProvider.getDcPointHistory(this.dcPoint.id, this.dcPoint.type, startDate, endDate).bindLifecycle(this)
    if (!this.historysData) this.loadErrorTipCmp.showLoading()
    else history = history.loadingOperate({content: '加载中...'})

    history.subscribe(
      (v) => {
        this.historysData = v
        this.chartHelp.rendData(v)
        this.loadErrorTipCmp.showContent()
      },
      (v) => {
        if (v.code === ErrorCode.Empty) {
          this.loadErrorTipCmp.showError('暂时还没有相关的数据值,晚一点再来看看吧', undefined, './assets/imgs/img_alarm_empty.png')
        }
        else {
          this.loadErrorTipCmp.showError(v, this.getHistoryData.bind(this, startDate, endDate))
        }
      }
    )
  }

  private setDcPointData(dcPoint: DcPointRE) {
    this.dcPoint = dcPoint
    this.alarmType = this.dcPoint.alarmType
    this.lowerLimitAlarm = getDcPointMinValue(this.dcPoint.type)
    this.upperLimitAlarm = getDcPointMaxValue(this.dcPoint.type)
  }
}
