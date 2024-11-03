import { Component } from '@angular/core';
import { TemperatureService } from '../../services/temperature/temperature.service';
import Temperature from '../../types/Temperature';
import ChartData from '../../types/ChartData';
import { LineChartComponent} from '../line-chart/line-chart.component';

@Component({
  selector: 'app-recent-temperatures',
  standalone: true,
  imports: [LineChartComponent],
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
