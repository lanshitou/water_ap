export class IrrigationTaskLE {
  duration: number = 0
  areaId: number = 0
  farmlandId: number = 0
}

export class IrrigationTasksLE {
  requestType: IrrigationTaskTypeEnum
  tasks: IrrigationTaskLE[]

  constructor(type: IrrigationTaskTypeEnum, tasks: IrrigationTaskLE[]) {
    this.requestType = type
    this.tasks = tasks
  }
}

export enum IrrigationTaskTypeEnum {
  Create = 1,
  Remove = 2
}
