import { Platform } from 'ionic-angular'
import { ServerInject } from '../../app/app.component'

let _isAndroid: boolean
let _isCordova: boolean
let _isIOS: boolean
let _isWeb: boolean

export function isCordova() {
  if (_isCordova === undefined) {
    _isCordova = ServerInject.get(Platform).is('cordova')
  }
  return _isCordova
}

export function isAndroid() {
  if (_isAndroid === undefined) {
    _isAndroid = ServerInject.get(Platform).is('android')
  }
  return _isAndroid
}

export function isIOS() {
  if (_isIOS === undefined) {
    _isIOS = ServerInject.get(Platform).is('ios')
  }
  return _isIOS
}

export function isWeb() {
  if (_isWeb === undefined) {
    _isWeb = !isAndroid() && !isIOS()
  }
  return _isWeb
}
