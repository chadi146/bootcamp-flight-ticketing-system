// app.component.ts
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { FlightSearchComponent } from '../app/pages/flight-search/flight-search.component';

const routes: Routes = [
  { path: '', component: FlightSearchComponent }
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {}
