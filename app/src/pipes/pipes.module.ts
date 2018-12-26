import { NgModule } from '@angular/core'
import { AlarmEndReasonPipe } from './alarm-end-reason/dc-point-alarm-end-reason'
import { DcPointColorPipe } from './dc-point-color/dc-point-color'
import { DcPointIconPipe } from './dc-point-icon/dc-point-icon'
import { DcPointSortNamePipe } from './dc-point-sort-name/dc-point-sort-name'
import { DcPointTypePipe } from './dc-point-type/dc-point-type'
import { DcPointUnitPipe } from './dc-point-unit/sensor-unit'
import { DcPointVisibleDelayPipe } from './dc-point-visible-delay/sensor-visible-delay'
import { DeviceIconPipe } from './device-icon/device-icon'
import { DeviceOpTypePipe } from './device-op-type/device-op-type'
import { DeviceOperateAllowPipe } from './device-operate-disallow/device-operate-disallow'
import { DeviceStatusTextColorPipe } from './device-status-text-color/device-status-text-color'
import { DeviceStatusPipe } from './device-status/device-status'
import { GetMessageCatNamePipe } from './get-message-cat-name/get-message-cat-name'
import { GetWaringIconPipe } from './get-waring-icon/get-waring-icon'
import { GetWaringTypePipe } from './get-waring-type/get-waring-type'
import { InfoTypePipe } from './info-type/info-type'
import { IrrigateResultStatusPipe } from './irrigate-result-status/irrigate-result-status'
import { IrrigateTaskStatusPipe } from './irrigate-task-status/irrigate-task-status'
import { MessageCatNamePipe } from './message-cat-name/message-cat-name'
import { MessageIconPipe } from './message-icon/message-icon'
import { NanPipe } from './nan/nan'
import { NumberRoundPipe } from './number-round/number-round'
import { RecentDatePipe } from './recent-date/recent-date'
import { UrlTransformPipe } from './url-transform/url-transform'
import { WaringTypeIconPipe } from './waring-type-icon/waring-type-icon'
import { MinutePipe } from './minute/minute'
import { FarmlandIrriStatusPipe } from './farmland-irri-status/farmland-irri-status'

@NgModule({
  declarations:
    [
      UrlTransformPipe,
      DcPointTypePipe,
      DcPointUnitPipe,
      DcPointColorPipe,
      NanPipe,
      DcPointVisibleDelayPipe,
      DeviceStatusPipe,
      DeviceOperateAllowPipe,
      DeviceStatusTextColorPipe,
      IrrigateTaskStatusPipe,
      IrrigateResultStatusPipe,
      RecentDatePipe,
      MessageIconPipe,
      DcPointSortNamePipe,
      AlarmEndReasonPipe,
      NumberRoundPipe,
      InfoTypePipe,
      MessageCatNamePipe,
      DcPointIconPipe,
      DeviceIconPipe,
      DeviceOpTypePipe,
      GetMessageCatNamePipe,
      GetWaringTypePipe,
      GetWaringIconPipe,
      WaringTypeIconPipe,
    MinutePipe,
    FarmlandIrriStatusPipe,
    ],
  exports:
    [
      UrlTransformPipe,
      DcPointTypePipe,
      DcPointUnitPipe,
      DcPointColorPipe,
      NanPipe,
      DcPointVisibleDelayPipe,
      DeviceStatusPipe,
      DeviceOperateAllowPipe,
      DeviceStatusTextColorPipe,
      IrrigateTaskStatusPipe,
      IrrigateResultStatusPipe,
      RecentDatePipe,
      MessageIconPipe,
      DcPointSortNamePipe,
      AlarmEndReasonPipe,
      NumberRoundPipe,
      InfoTypePipe,
      MessageCatNamePipe,
      DcPointIconPipe,
      DeviceIconPipe,
      DeviceOpTypePipe,
      GetMessageCatNamePipe,
      GetWaringTypePipe,
      GetWaringIconPipe,
      WaringTypeIconPipe,
    MinutePipe,
    FarmlandIrriStatusPipe,
    ]
})
export class PipesModule {
}
