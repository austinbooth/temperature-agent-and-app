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
  private readonly baseUrl = 'https://localhost:5555/api/temperature';

  constructor(private http: HttpClient) {}

  getRecentData(deviceId: string): Observable<Temperature[]> {
    const options = { withCredentials: false };
    return this.http.get<Temperature[]>(`${this.baseUrl}/recent/${deviceId}`, options);
  }

  getAverageData({deviceId, startDate, endDate}: GetAverageDataParams): Observable<AverageTemperature[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    
    const options = { 
      params,
      withCredentials: false
    };
    
    return this.http.get<AverageTemperature[]>(`${this.baseUrl}/average/${deviceId}`, options);
  }
}
