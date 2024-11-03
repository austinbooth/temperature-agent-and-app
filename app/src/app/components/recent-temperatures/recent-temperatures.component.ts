import { Component } from '@angular/core';
import { TemperatureService } from '../../services/temperature/temperature.service';
import Temperature from '../../types/Temperature';

@Component({
  selector: 'app-recent-temperatures',
  standalone: true,
  imports: [],
  templateUrl: './recent-temperatures.component.html',
  styleUrl: './recent-temperatures.component.scss'
})
export class RecentTemperaturesComponent {
  temperatures: Temperature[] = [];

  constructor(private temperatureService: TemperatureService) {
    this.temperatureService.getRecentData('1234').subscribe((data: Temperature[]) => {
      this.temperatures = data;
      console.log(this.temperatures);
    });
  }
}
