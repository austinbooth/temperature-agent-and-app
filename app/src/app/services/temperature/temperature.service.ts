import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import Temperature from '../../types/Temperature';
import AverageTemperature from '../../types/AverageTemperature';

type GetAverageDataParams = {
  deviceId: string;
  startDate: string;
  endDate: string;
};

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(private http: HttpClient) {}

  getRecentData(deviceId: string): Observable<Temperature[]> {
    return this.http.get<Temperature[]>(`http://localhost:5555/api/temperature/recent/${deviceId}`);
  }

  getAverageData({deviceId, startDate, endDate}: GetAverageDataParams): Observable<AverageTemperature[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<AverageTemperature[]>(`http://localhost:5555/api/temperature/average/${deviceId}`, { params });
  }
}
