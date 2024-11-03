import { Component, OnInit, OnDestroy } from '@angular/core';
import { TemperatureService } from '../../services/temperature/temperature.service';
import Temperature from '../../types/Temperature';
import ChartData from '../../types/ChartData';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-recent-temperatures',
  standalone: true,
  imports: [LineChartComponent],
  templateUrl: './recent-temperatures.component.html',
  styleUrl: './recent-temperatures.component.scss'
})
export class RecentTemperaturesComponent implements OnInit, OnDestroy {
  chartData: ChartData[] = [];
  pollingSubscription?: Subscription;

  constructor(private temperatureService: TemperatureService) {}

  ngOnInit() {
    this.updateChartData();
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.updateChartData();
    });
  }

  updateChartData() {
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

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
