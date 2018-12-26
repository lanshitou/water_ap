import { DatePipe } from "@angular/common"
import { LOCALE_ID } from "@angular/core"
import { ServerInject } from "../app/app.component"

export function getDatePipe(): DatePipe {
  return new DatePipe(ServerInject.get(LOCALE_ID))
}
