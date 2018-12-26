export enum WaringTypeEnum {
  None = 0, //没有触发
  UpperLimit = 1, //触发上限
  LowerLimit = 2, //触发下限
  DeviceOffline = 3, //设备离线
  IrrigationFail = 4, //灌溉任务失败
}

export enum GetWaringTypeEnum {
  Alarm = 1, //阈值告警
  Irrigate = 2, //灌溉任务
  Offline = 3, //设备离线
  Other = 4, //其他告警
}

export enum AlarmEndReasonEnum {
  ManualChangeLimit = 1, //手动更改预警值,告警解除
  AutoChange = 2, //采集值恢复到正常值,告警解除
  Offline = 3, //传感器离线,告警解除
}
