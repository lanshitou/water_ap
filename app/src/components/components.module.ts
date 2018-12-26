import { NgModule } from '@angular/core'
import { IonicPageModule } from 'ionic-angular'
import { DirectivesModule } from '../directives/directives.module'
import { PipesModule } from '../pipes/pipes.module'
import { CommentItemComponent } from './comment-item/comment-item'
import { CommentPublishComponent } from './comment-publish/comment-publish'
import { CommentWarpComponent } from './comment-warp/comment-warp'
import { DcPointGroupComponent } from './dc-point-group/dc-point-group'
import { DcPointComponent } from './dc-point/dc-point'
import { DecorateTitleComponent } from './decorate-title/decorate-title'
import { DeviceGroupComponent } from './device-group/device-group'
import { DeviceLocationComponent } from './device-location/device-location'
import { DeviceComponent } from './device/device'
import { ImportantMessageComponent } from './important-message/important-message'
import { InfoWarpComponent } from './info-warp/info-warp'
import { IrrigateTaskHistorySimpleComponent } from './irrigate-task-history-simple/irrigate-task-history-simple'
import { IrrigateTaskHistoryComponent } from "./irrigate-task-history/irrigate-task-history"
import { JoystickComponent } from './joystick/joystick'
import { LoadMoreComponent } from './load-more/load-more'
import { LoadingErrorTipComponent } from './loading-error-tip/loading-error-tip'
import { MessageItemComponent } from "./message-item/message-item"
import { MdProgressSpinner } from './progress-spinner/progress-spinner'
import { PullRefreshComponent } from './pull-refresh/pull-refresh'
import { ScrollYContainerComponent } from './scroll-y-container/scroll-y-container'
import { VideoPlayerComponent } from './video-player/video-player'
import { WaringStatisticComponent } from './waring-statistic/waring-statistic'
import { WeatherComponent } from './weather/weather'

@NgModule({
  imports: [IonicPageModule, DirectivesModule, PipesModule],
  declarations: [MdProgressSpinner,
    LoadingErrorTipComponent,
    DecorateTitleComponent,
    DcPointComponent,
    DcPointGroupComponent,
    DeviceComponent,
    PullRefreshComponent,
    LoadMoreComponent,
    IrrigateTaskHistoryComponent,
    WeatherComponent,
    VideoPlayerComponent,
    JoystickComponent,
    ScrollYContainerComponent,
    InfoWarpComponent,
    WaringStatisticComponent,
    MessageItemComponent,
    CommentWarpComponent,
    CommentItemComponent,
    DeviceGroupComponent,
    DeviceLocationComponent,
    CommentPublishComponent,
    IrrigateTaskHistorySimpleComponent,
    ImportantMessageComponent,
  ],
  exports: [MdProgressSpinner,
    LoadingErrorTipComponent,
    DecorateTitleComponent,
    DcPointComponent,
    DcPointGroupComponent,
    DeviceComponent,
    PullRefreshComponent,
    LoadMoreComponent,
    IrrigateTaskHistoryComponent,
    WeatherComponent,
    VideoPlayerComponent,
    JoystickComponent,
    ScrollYContainerComponent,
    InfoWarpComponent,
    WaringStatisticComponent,
    MessageItemComponent,
    CommentWarpComponent,
    CommentItemComponent,
    DeviceGroupComponent,
    DeviceLocationComponent,
    CommentPublishComponent,
    IrrigateTaskHistorySimpleComponent,
    ImportantMessageComponent,
  ]
})
export class ComponentsModule {
}
