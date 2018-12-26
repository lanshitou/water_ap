export enum MessageTypeEnum {
  NotifyArticle = 1,                    //文章通知消息
  Irrigation = 10,                      //灌溉任务状态更新消息
  IrrigationFail = 11,                  //灌溉任务失败告警消息
  DeviceOffline = 20,                   //设备离线告警消息
  DeviceOnline = 21,                    //设备离线告警消除消息
  ThresholdWarningProduced = 30,        //阈值告警产生消息
  ThresholdWarningCleared = 31,         //阈值告警消除消息
}

export enum GetMessageTypeEnum {
  Notify = 1,
  Irrigation = 2,
  Offline = 3,
  Alarm = 4,
}
