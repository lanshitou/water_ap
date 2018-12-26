import { JsonConverter, JsonCustomConvert } from "json2typescript"
import { IrrigateTaskResultStatusEnum } from "../irrigate-enum"

//浇水状态服务器数据转换
@JsonConverter
export class IrrigateTaskResultConvert implements JsonCustomConvert<IrrigateTaskResultStatusEnum> {
  serialize(data: IrrigateTaskResultStatusEnum): any {
    return undefined
  }

  deserialize(data: number): IrrigateTaskResultStatusEnum {
    switch (data) {
      case 0: //成功
        return IrrigateTaskResultStatusEnum.AutoComplete
      case 100: //用户取消
        return IrrigateTaskResultStatusEnum.UserManualCancel
      default :
        return IrrigateTaskResultStatusEnum.ErrorMsg
    }
  }
}
