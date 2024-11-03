import { Component } from '@angular/core';
import { TemperatureService } from '../../services/temperature/temperature.service';
import Temperature from '../../types/Temperature';
import { NgxChartsModule } from '@swimlane/ngx-charts';

type ChartData = {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
};

@Component({
  selector: 'app-recent-temperatures',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './recent-temperatures.component.html',
  styleUrl: './recent-temperatures.component.scss'
})
export class RecentTemperaturesComponent {
  chartData: ChartData[] = [];

  constructor(private temperatureService: TemperatureService) {
    this.temperatureService.getRecentData('1234').subscribe((data: Temperature[]) => {
      this.chartData = [
        {
          name: 'Temperature',
          series: data.map((temperature: Temperature) => ({
            name: temperature.timestamp,
            value: temperature.temperature
          }))
        }
      ];
    });
  }
}
