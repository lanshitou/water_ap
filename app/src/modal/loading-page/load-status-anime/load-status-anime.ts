import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'load-status-anime',
  templateUrl: 'load-status-anime.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.loading]': 'status === 1',
    '[class.succeed]': 'status === 2',
    '[class.failed]': 'status === 3',
  }
})
export class LoadStatusAnimeComponent {
  @Input() status: LoadingStatusEnum
}

export enum LoadingStatusEnum {
  Loading = 1,
  Succeed = 2,
  Failed = 3,
}
