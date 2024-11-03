import { Component } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TemperatureService } from '../../services/temperature/temperature.service';
import AverageTemperature from '../../types/AverageTemperature';
import ChartData from '../../types/ChartData';

@Component({
  selector: 'app-average-temperatures',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './average-temperatures.component.html',
  styleUrl: './average-temperatures.component.scss'
})
export class AverageTemperaturesComponent {
  chartData: ChartData[] = [];

  constructor(private temperatureService: TemperatureService) {
    this.temperatureService.getAverageData({
      deviceId: '1234',
      startDate: '11-1-2024',
      endDate: '11-4-2024',
    }).subscribe((data: AverageTemperature[]) => {
      this.chartData = [
        {
          name: 'Average temperature',
          series: data.map((averageTemperature: AverageTemperature) => ({
            name: averageTemperature.timestamp,
            value: averageTemperature.averageTemp
          }))
        }
      ];
    });
  }
}
