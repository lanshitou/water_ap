import { HttpClientModule } from '@angular/common/http'
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { InAppBrowser } from "@ionic-native/in-app-browser"
import { Network } from "@ionic-native/network"
import { ScreenOrientation } from "@ionic-native/screen-orientation"
import { SplashScreen } from '@ionic-native/splash-screen'
import { IonicStorageModule } from '@ionic/storage'
import { JPush } from "@jiguang-ionic/jpush"
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular'
import '../extend/api-operate'
import '../extend/lifecycle/lifecycle-operate'
import '../extend/loading-operate'
import { DeviceOperateController } from "../modal/device-operate/device-operate-controller"
import { IrrigationTaskController } from "../modal/irrigation-task-duration/irrigation-task-controller"
import { LoadingPageController } from "../modal/loading-page/loading-page-controller"

import { HttpInterceptorProviders } from '../providers/base/base-interceptor'
import { CameraProvider } from '../providers/camera/camera'
import { DcPointProvider } from '../providers/dc-point/dc-point'
import { DeviceProvider } from '../providers/device/device'
import { FarmlandProvider } from '../providers/farmland/farmland'
import { InfoProvider } from "../providers/info/InfoProvider"
import { IrrigateProvider } from '../providers/irrigate/irrigate'
import { LocalConfigProvider } from '../providers/local-config/local-config'
import { MessageProvider } from '../providers/message/message'
import { SystemProvider } from '../providers/system/system'
import { ToastControllerExProvider } from '../providers/toast-control-ex/toast-controler-ex'
import { UserProvider } from '../providers/user/user'
import { WaringProvider } from '../providers/waring/waring'
import { WeatherProvider } from '../providers/weather/weather'
import { MyApp } from './app.component'


@NgModule({
  bootstrap: [IonicApp],
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      mode: 'md',
      tabsHideOnSubPages: true,
      disableScrollAssist: true,
      statusbarPadding: true,
      swipeBackEnabled: true,
    })
  ],
  providers: [
    SplashScreen,
    InAppBrowser,
    ScreenOrientation,
    Network,
    JPush,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: 'zh-Hans'},
    HttpInterceptorProviders,
    LocalConfigProvider,
    ToastControllerExProvider,
    LoadingPageController,
    IrrigationTaskController,
    DeviceOperateController,
    UserProvider,
    SystemProvider,
    DeviceProvider,
    FarmlandProvider,
    IrrigateProvider,
    DcPointProvider,
    MessageProvider,
    WeatherProvider,
    CameraProvider,
    InfoProvider,
    WaringProvider,
  ]
})
export class AppModule {
}
