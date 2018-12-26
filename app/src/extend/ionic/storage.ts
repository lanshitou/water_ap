import { EventEmitter } from "@angular/core"
import { Type } from "@angular/core/src/type"
import { Storage } from '@ionic/storage'
import { JsonConvert } from "json2typescript"
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { takeWhile } from "rxjs/operators"
import { ServerInject } from '../../app/app.component'
import { LocalConfigProvider } from "../../providers/local-config/local-config"
import { tokenManageInit } from "../../providers/token/token-manage"
import { e } from "../log"

export let storage: Storage

export async function storageInit() {
  storage = ServerInject.get(Storage)
  await tokenManageInit()

  let config = ServerInject.get(LocalConfigProvider)
  await config.refreshTimeEv.isSync().toPromise()
  await config.weatherLastSelectEv.isSync().toPromise()
  await config.lastSelectSystemEv.isSync().toPromise()
  await config.serverUrl.isSync().toPromise()
}

export class StorageValue<T> {
  //值改变通知
  changeEvent = new EventEmitter<T>()
  //是否完成同步
  private _isSync = new BehaviorSubject<boolean>(false)

  //值
  private _value: T

  get value(): T {
    return this._value
  }

  set value(v) {
    if (this.ignoreEqual && v === this._value) return
    if (v === undefined || v === null) storage.remove(this.key)
    else if (this._value !== v) storage.set(this.key, v)
    this._value = v
    this.changeEvent.emit(this._value)
  }

  constructor(private key: string, defaultValue?: T, private ignoreEqual: boolean = true, type?: Type<T>) {
    storage.get(key).then(
      (v) => {
        v = (v === null || v === undefined) ? defaultValue : v
        if (v !== null && v !== undefined && type && type.prototype['__jsonconvert__mapping__']) {
          try {
            let jsonConvert = new JsonConvert()
            this.value = jsonConvert.deserialize(v, type)
          }
          catch (v) {
            e(v)
          }
        } else {
          this.value = v
        }
        this._isSync.next(true)
      }
    )
  }

  notifyAgain() {
    this.changeEvent.emit(this._value)
  }

  isSync() {
    return this._isSync.pipe(takeWhile((v: boolean) => !v))
  }
}
