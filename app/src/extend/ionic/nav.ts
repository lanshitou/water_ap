import { App, NavController } from 'ionic-angular'
import { isTabs } from 'ionic-angular/navigation/nav-util'
import { ServerInject } from '../../app/app.component'

export function getRootNav(nav: NavController) {
  let navNew = nav
  //tabs没有跳转能力, 而且没有上级Nav 需要过滤
  while (navNew.parent && !isTabs(navNew.parent)) {
    navNew = navNew.parent
  }
  return navNew
}

export function getActivePortalNav() {
  let app = ServerInject.get(App)
  let rootNavs = app['_appRoot']
  return rootNavs._getActivePortal()
}

