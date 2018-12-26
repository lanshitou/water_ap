import { JsonConvert } from 'json2typescript'
import { Observable } from 'rxjs/Observable'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { _throw } from 'rxjs/observable/throw'
import { catchError, switchMap, timeoutWith } from 'rxjs/operators'
import { ErrorCode, JSON_ERR, RESULT_ERR, TIMEOUT_ERR } from '../contract/error-code'
import { TokenManageProvider } from '../providers/token/token-manage'
import { e } from './log'

function apiOperate<T>(this: Observable<any>, type: {new(): any}, baseLike: boolean = true): Observable<T> {
  return this.pipe(
    catchError((v) => {
      e(v)
      return ErrorObservable.create(RESULT_ERR)
    }),
    timeoutWith(20000, ErrorObservable.create(TIMEOUT_ERR)),
    switchMap((v) => handleResponse(v, type, baseLike)),
  )
}

function handleResponse<T>(data: any, type: {new(): T}, baseLike: boolean): Observable<T> {
  return baseLike ? handleBaseLikeResponse(data, type) : handleOtherResponse(data, type)
}

//忽略错误码只解析数据
function handleOtherResponse<T>(data: any, type: {new(): T}): Observable<T> {
  return parseJson(data, type)
}

//带错误码的服务器
function handleBaseLikeResponse<T>(data: any, type: {new(): T}): Observable<T> {
  if (data.code !== ErrorCode.OK) {
    if (data.code === ErrorCode.OAUTH_ERR) TokenManageProvider.cleanUserOauth()
    return _throw(data)
  }
  return parseJson(data.data, type)
}

function parseJson<T>(data: any, type: {new(): T}): Observable<T> {
  if (type && type.prototype['__jsonconvert__mapping__']) {
    try {
      if (typeof data === 'string') data = JSON.parse(data)
      let deserialize = new JsonConvert().deserialize(data, type) as T
      return Observable.create((v) => v.next(deserialize))
    }
    catch (v) {
      e(v)
      return _throw(JSON_ERR)
    }
  }
  else if (type && (data === undefined || data === null)) return _throw(JSON_ERR)
  else return Observable.create((v) => v.next(data as T))
}

declare module 'rxjs/Observable' {
  interface Observable<T> {
    apiOperate: typeof apiOperate
  }
}
Observable.prototype.apiOperate = apiOperate
