import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'decorate-title',
  templateUrl: 'decorate-title.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.sub-title]': 'subTitle'
  }
})
export class DecorateTitleComponent {
  @Input() subTitle = false
}
