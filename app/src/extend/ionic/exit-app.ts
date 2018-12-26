import { ServerInject } from '../../app/app.component'
import { ToastControllerExProvider } from '../../providers/toast-control-ex/toast-controler-ex'

let lastClickTime = 0

export function considerExitApp(): boolean {
  let now = Date.now()
  if (now - lastClickTime <= 2000) return true
  else ServerInject.get(ToastControllerExProvider).show({message: '再按一次退出'})
  lastClickTime = now
  return false
}
