import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core'
import { ErrorCode } from '../../contract/error-code'

@Component({
  selector: 'loading-error-tip',
  templateUrl: 'loading-error-tip.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoadingErrorTipComponent {
  @Input() progressColor = '#448AFF'
  @Input() progressRadius = 26
  @Input() backgroundColor
  @Input() textColor

  @Input() state = Status.Loading

  @Input() errorImg = ImgErrorEmpty
  @Input() errorTip = ''
  @Input() tryDo: Function = undefined

  constructor(public c: ChangeDetectorRef) {
  }

  showError(error: CodeType | string, tryDo?: Function, errorImg?: string) {
    if (typeof error === 'string') {
      this.clean()
      this.errorTip = error
      this.errorImg = errorImg ? errorImg : ImgErrorGeneric
    }
    else {
      if (error.code === ErrorCode.OAUTH_ERR) return
      this.clean()
      this.errorTip = error.message
      this.errorImg = errorImg ? errorImg : error.code === ErrorCode.Empty ? ImgErrorEmpty : ImgErrorGeneric
    }

    this.tryDo = tryDo
    this.state = Status.Err
    this.c.detectChanges()
  }

  showContent() {
    this.clean()
    this.state = Status.None
    this.c.detectChanges()
  }

  showLoading() {
    this.clean()
    this.state = Status.Loading
    this.c.detectChanges()
  }

  private clean() {
    this.errorImg = ImgErrorEmpty
    this.errorTip = ''
    this.tryDo = undefined
  }
}

export interface CodeType {
  code: number,
  message: string
}

enum Status {Err = 1, Loading = 2, None = 3}

export const ImgErrorEmpty = './assets/imgs/img_list_empty.png'
export const ImgErrorGeneric = './assets/imgs/img_err_generic.png'
