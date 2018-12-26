//浇水状态服务器数据转换
import { JsonConverter, JsonCustomConvert } from "json2typescript"

@JsonConverter
export class DateConverter implements JsonCustomConvert<Number> {
  serialize(data: Number): any {
    return data
  }

  deserialize(data: any): Number {
    let date = new Date(data)
    return date.getTime()
  }
}
