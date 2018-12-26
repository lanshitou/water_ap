export enum DeviceTypeEnum {
  ElectronicValve = 1, //电动阀
  ElectromagneticValve = 2, //电磁阀
  PulseElectromagneticValve = 9, //脉冲电磁阀
  Pump = 3, //水泵
  Fan = 4, //风机
  ShutterMachine = 5, //卷帘机
  GrowLight = 6, //生长灯
  Healer = 7, //加热器
  Dehumidifier = 8, //除湿器
}

export enum DeviceStatusEnum {
  Offline = -1, //状态离线
  //水泵、电磁阀、风机、生长灯、加热器、除湿器等仅具有开和关两种状态的设备
  On = 110, //设备开启
  Off = 111, //设备关闭
  //电动阀和卷帘机设备的状态
  Closed = 0, //电动阀或者卷帘处于完全关闭的状态
  Opened = 100, //电动阀或者卷帘处于完全开启的状态
  Stopped = 101, //电动阀或者卷帘处于停止运行状态，但是开启程度未知
  Openning = 102, //电动阀或者卷帘正在开启
  Closing = 103, //电动阀或者卷帘正在关闭
}
