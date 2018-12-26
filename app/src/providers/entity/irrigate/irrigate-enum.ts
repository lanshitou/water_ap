export enum IrrigateTaskStatusEnum {
  Waitting = 1, //等待执行
  Starting = 2, //启动中
  Runed = 3, //运行中
  Stoping = 4, //停止中
  Stoped = 5, //已停止
}

export enum IrrigateTaskResultStatusEnum {
  AutoComplete = 0, //正常完成
  UserManualCancel = 1, //用户取消
  ErrorMsg = 3, //见错误描述
}
