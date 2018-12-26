import { ChangeDetectionStrategy, Component, Injector, Input, Renderer2 } from '@angular/core'
import { WeatherAllWrapRE } from '../../providers/weather/entity/he-weather-6'
import { BaseComponent } from '../base/base-component'

@Component({
  selector: 'weather',
  templateUrl: 'weather.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherComponent extends BaseComponent {
  @Input() data: WeatherAllWrapRE

  constructor(protected injector: Injector, public rend2: Renderer2) {
    super(injector)
  }
}
