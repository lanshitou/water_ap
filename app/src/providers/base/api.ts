import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ServerInject } from '../../app/app.component'

@Injectable()
export class Api {
  protected get http(): HttpClient {
    return ServerInject.get(HttpClient)
  }
}
