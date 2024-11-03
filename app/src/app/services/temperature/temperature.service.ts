import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Temperature from '../../types/Temperature';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(private http: HttpClient) {}

  getRecentData(deviceId: string): Observable<Temperature[]> {
    return this.http.get<Temperature[]>(`http://localhost:5555/api/temperature/recent/${deviceId}`);
  }
}
