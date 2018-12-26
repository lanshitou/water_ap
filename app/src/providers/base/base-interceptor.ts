import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable'
import { TokenManageProvider } from '../token/token-manage'


//服务器时间差
let diffTime = 0

export function getServerTime() {
  return Date.now() - diffTime
}

export class BaseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers
    if (headers.get('NoAppToken')) headers = headers.delete('NoAppToken')
    else if (TokenManageProvider.ev.value) headers = headers.set('AppToken', TokenManageProvider.ev.value.token)
    return next.handle(req.clone({headers}))
      .map((value) => {
        if (value.type === HttpEventType.ResponseHeader) {
          diffTime = Date.now() - Date.parse(value.headers.get('Date'))
          if (Number.isNaN(diffTime)) diffTime = 0
        }
        return value
      })
  }
}

export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true},
]
