import { Component } from '@angular/core';
import { TemperatureService } from '../../services/temperature/temperature.service';
import AverageTemperature from '../../types/AverageTemperature';
import ChartData from '../../types/ChartData';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-average-temperatures',
  standalone: true,
  imports: [LineChartComponent, FormsModule, NgIf],
  templateUrl: './average-temperatures.component.html',
  styleUrls: ['./average-temperatures.component.scss']
})
export class AverageTemperaturesComponent {
  startDate: string = '';
  endDate: string = '';
  chartData: ChartData[] = [];

  constructor(private temperatureService: TemperatureService) { }

  onDateChange(): void {
    if (this.startDate && this.endDate) {
      this.fetchAverageData();
    }
  }

  fetchAverageData(): void {
    this.temperatureService.getAverageData({
      deviceId: '1234',
      startDate: this.startDate,
      endDate: `${this.endDate}T23:59:59.999Z`,
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
