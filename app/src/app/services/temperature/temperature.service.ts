import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Temperature {
  _id: string;
  deviceId: string;
  temperature: number;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  constructor(private http: HttpClient) {}

  getRecentData(deviceId: string): Observable<Temperature[]> {
    return this.http.get<Temperature[]>(`/api/temperature/recent/${deviceId}`);
  }
}
