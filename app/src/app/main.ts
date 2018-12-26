import { registerLocaleData } from '@angular/common'
import localeExtra from '@angular/common/locales/extra/zh-Hans'
import locale from '@angular/common/locales/zh-Hans'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app.module'

// enableProdMode()
registerLocaleData(locale, 'zh-Hans', localeExtra)
platformBrowserDynamic().bootstrapModule(AppModule)
