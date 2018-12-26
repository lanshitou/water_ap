import { JsonObject, JsonProperty } from 'json2typescript'

@JsonObject
export class WeatherBasicRE {
  @JsonProperty('cid', String)
  cid: string = undefined
  @JsonProperty('location', String)
  location: string = undefined
  @JsonProperty('admin_area', String, true)
  adminArea: string = undefined
}

@JsonObject
export class WeatherNowRE {
  @JsonProperty('fl', String)
  fl: string = undefined
  @JsonProperty('tmp', String)
  tmp: string = undefined
  @JsonProperty('cond_code', String)
  condCode: string = undefined
  @JsonProperty('cond_txt', String)
  condTxt: string = undefined
}

@JsonObject
export class WeatherDailyForecastRE {
  @JsonProperty('date', String)
  date: string = undefined
  @JsonProperty('tmp_max', String)
  tmpMax: string = undefined
  @JsonProperty('tmp_min', String)
  tmpMin: string = undefined
  @JsonProperty('cond_txt_d', String)
  condTxtD: string = undefined
  @JsonProperty('cond_txt_n', String)
  condTxtN: string = undefined
  @JsonProperty('cond_code_d', String)
  condCodeD: string = undefined
  @JsonProperty('cond_code_n', String)
  condCodeN: string = undefined
}

@JsonObject
export class WeatherUpdateRE {
  @JsonProperty('loc', String)
  loc: string = undefined
}

@JsonObject
export class WeatherWrapRE {
  @JsonProperty('status', String)
  status: string = undefined
}

@JsonObject
export class WeatherAllWrapRE extends WeatherWrapRE {
  @JsonProperty('basic', WeatherBasicRE, true)
  basic: WeatherBasicRE = undefined
  @JsonProperty('now', WeatherNowRE, true)
  now: WeatherNowRE = undefined
  @JsonProperty('update', WeatherUpdateRE, true)
  update: WeatherUpdateRE = undefined
  @JsonProperty('daily_forecast', [WeatherDailyForecastRE], true)
  dailyForecast: WeatherDailyForecastRE[] = undefined
}

@JsonObject
export class WeatherSearchWrapRE extends WeatherWrapRE {
  @JsonProperty('basic', [WeatherBasicRE], true)
  basic: WeatherBasicRE[] = undefined
}

@JsonObject
export class WeatherResultRE {
  @JsonProperty('HeWeather6', [WeatherWrapRE])
  heWeather: WeatherWrapRE[] = undefined
}

@JsonObject
export class WeatherSearchResultRE extends WeatherResultRE {
  @JsonProperty('HeWeather6', [WeatherSearchWrapRE])
  heWeather: WeatherSearchWrapRE[] = undefined
}

@JsonObject
export class WeatherAllResultRE extends WeatherResultRE {
  @JsonProperty('HeWeather6', [WeatherAllWrapRE])
  heWeather: WeatherAllWrapRE[] = undefined
}
