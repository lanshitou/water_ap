export class DeviceOperateArgLE {
  opType: DeviceOperateTypeEnum
  args: DeviceArgLE = new DeviceArgLE()
}

export class DeviceArgLE {
  position: number = 0
  autoStop: boolean = false
  duration: number = 0
}

export enum DeviceOperateTypeEnum {
  Start = 1,
  Stop = 2
}
