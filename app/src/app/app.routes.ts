import { Routes } from '@angular/router';
import { RecentTemperaturesComponent } from './components/recent-temperatures/recent-temperatures.component';

export const routes: Routes = [
    { path: '', redirectTo: 'temperature/recent', pathMatch: 'full' },
    { path: 'temperature/recent', component: RecentTemperaturesComponent },
];
