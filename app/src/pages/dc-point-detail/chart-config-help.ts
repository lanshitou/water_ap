import * as F2 from '@antv/f2'
import { getDatePipe } from "../../extend/date-transform"
import { DcPointTypePipe } from "../../pipes/dc-point-type/dc-point-type"
import { DcPointAlarmRLE } from '../../providers/dc-point/entity/alarm'
import { DcPointHistoryLE } from '../../providers/dc-point/entity/history'
import {
  DcPointTypeEnum,
  getDcPointMaxValue,
  getDcPointMinValue
} from '../../providers/entity/dc-point/dc-point-alarm-status-enum'

export class ChartConfigHelp {
  static UpperErrorColor = '#ff1e28'
  static LowerErrorColor = '#e9be5c'
  static NormalColor = '#4b89da'

  chart: any
  alarmData: DcPointAlarmRLE
  historyData: DcPointHistoryLE[]

  private hasRend = false
  private dcPointType: DcPointTypeEnum
  private maxValue: number
  private minValue: number
  private beforeRender: Function

  createAndConfig(dcPointType: DcPointTypeEnum, ele: HTMLElement, beforeRender?: Function) {
    this.dcPointType = dcPointType
    this.beforeRender = beforeRender
    this.chart = new F2.Chart({
      el: ele,
      pixelRatio: window.devicePixelRatio
    })

    // 时间轴 标签位置,左右两不能居中显示
    this.chart.axis('date', {
      label: (text, index, total) => {
        let textCfg: any = {}
        if (index === 0) {
          textCfg.textAlign = 'left'
        } else if (index === total - 1) {
          textCfg.textAlign = 'right'
        }
        return textCfg
      }
    })

    //提示工具
    this.chart.tooltip({
      offsetY: 30,
      showCrosshairs: true,
      showTitle: true,
      onShow: (v) => {
        let item = v.items[0]
        item.title = getDatePipe().transform(item.origin.date, 'yyyy-MM-dd HH:mm')
      },
    })

    //线
    this.chart.line().color(ChartConfigHelp.NormalColor).position('date*value')
    return this.chart
  }

  //警告区域颜色配置
  chartConfig(alarmData?: DcPointAlarmRLE) {
    this.alarmData = alarmData
    //重置图例
    this.chart.guide().clear()
    if (!alarmData || !this.maxValue === undefined || !this.minValue === undefined) {
      //应用图例
      if (this.hasRend) {
        if (this.beforeRender) this.beforeRender()
        this.chart.repaint()
      }
      return
    }
    //区域颜色过滤
    //上限颜色
    let guide = this.chart.guide()
    if (alarmData.upperLimit !== undefined && alarmData.upperLimit <= this.maxValue) {
      guide.regionFilter({
        start: ['min', alarmData.upperLimit],
        end: ['max', 'max'],
        color: ChartConfigHelp.UpperErrorColor
      }).line({
        start: ['min', alarmData.upperLimit],
        end: ['max', alarmData.upperLimit],
        style: {
          stroke: ChartConfigHelp.UpperErrorColor,
          lineDash: [2]
        }
      })
    }
    //下限颜色
    if (alarmData.lowerLimit !== undefined && alarmData.lowerLimit >= this.minValue) {
      this.chart.guide().regionFilter({
        start: ['max', alarmData.lowerLimit],
        end: ['min', 'min'],
        color: ChartConfigHelp.LowerErrorColor
      }).line({
        start: ['min', alarmData.lowerLimit],
        end: ['max', alarmData.lowerLimit],
        style: {
          stroke: ChartConfigHelp.LowerErrorColor,
          lineDash: [2]
        }
      })
    }
    //应用图例
    if (this.hasRend) {
      if (this.beforeRender) this.beforeRender()
      this.chart.repaint()
    }
  }

  rendData(data: DcPointHistoryLE[]) {
    this.historyData = data

    let maxValue = Number.MIN_VALUE
    let minValue = Number.MAX_VALUE
    let dcPointType = this.dcPointType

    data.forEach((v) => {
      if (v.value > maxValue) maxValue = v.value
      if (v.value < minValue) minValue = v.value
    })

    maxValue = maxValue === Number.MIN_VALUE ? getDcPointMaxValue(dcPointType) : Math.min(getDcPointMaxValue(dcPointType), maxValue * 1.2)
    minValue = minValue === Number.MAX_VALUE ? getDcPointMinValue(dcPointType) : Math.max(getDcPointMinValue(dcPointType), minValue * 0.8)

    this.maxValue = maxValue
    this.minValue = minValue

    //数据轴数据格式化
    this.chart.scale('value', {
      type: 'linear',
      sortable: false,
      nice: false,
      alias: new DcPointTypePipe().transform(dcPointType),
      max: maxValue,
      min: minValue,
    })

    //时间轴数据格式化
    let tickCount: number
    let mask: string
    if (data.length >= 48) {
      tickCount = Math.round(data.length / 24)
      mask = 'D号'
    } else {
      tickCount = 4
      mask = 'D号H点'
    }
    this.chart.scale('date', {
      type: 'timeCat',
      sortable: false,
      nice: false,
      tickCount: tickCount,
      mask: mask,
    })

    this.chart.changeData(data)
    this.hasRend = true

    //警告区域颜色配置
    this.chartConfig(this.alarmData)
  }
}
