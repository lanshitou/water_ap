import { Injectable } from '@angular/core'
import { Lsk } from '../../contract/lsk'
import { StorageValue } from '../../extend/ionic/storage'
import { WeatherBasicRE } from "../weather/entity/he-weather-6"

@Injectable()
export class LocalConfigProvider {
  receiveMessageEv = new StorageValue<boolean>(Lsk.SettingReceiveMessage, true)
  refreshTimeEv = new StorageValue<number>(Lsk.SettingAutoRefreshTime, 60 * 1000)
  weatherLastSelectEv = new StorageValue<WeatherBasicRE>(Lsk.WeatherLastSelectedCity, undefined, false, WeatherBasicRE)
  lastSelectSystemEv = new StorageValue<number>(Lsk.LastSelectedSystemId, undefined)
  serverUrl = new StorageValue<string>(Lsk.ServerUrl, undefined)
}
