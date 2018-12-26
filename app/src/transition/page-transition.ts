import { Animation, PageTransition } from 'ionic-angular'
import { isPresent } from 'ionic-angular/es2015/util/util'

const TRANSLATEX = 'translateX'
const OFF_RIGHT = '100%'
const OFF_LEFT = '-30%'
const CENTER = '0px'

export class GPageTransition extends PageTransition {
  init() {
    super.init()

    const plt = this.plt
    const enteringView = this.enteringView
    const leavingView = this.leavingView
    const opts = this.opts
    const backDirection = (opts.direction === 'back')

    if (enteringView && this.enteringPage) {
      if (backDirection) {
        this.duration(isPresent(opts.duration) ? opts.duration : 300)
        this.enteringPage.fromTo(TRANSLATEX, OFF_LEFT, CENTER, true)
      } else {
        this.duration(isPresent(opts.duration) ? opts.duration : 300)
        this.enteringPage.fromTo(TRANSLATEX, OFF_RIGHT, CENTER, true)
      }
    }

    // setup leaving view
    if (leavingView) {
      if (backDirection) {
        const leavingPage = new Animation(plt, leavingView.pageRef())
        this.duration(isPresent(opts.duration) ? opts.duration : 220)
        leavingPage.fromTo(TRANSLATEX, CENTER, OFF_RIGHT, true)
        this.add(leavingPage)
      }
    }
  }

}
