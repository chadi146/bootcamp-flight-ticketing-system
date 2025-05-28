import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  fromStations: string[] = [];
  toStations: string[] = [];
  from = '';
  to = '';
  date = '';

  private flightService = inject(FlightService);
  private router = inject(Router);
origins: any;
destinations: any;
loading: any;
error: any;
flights: any;

  ngOnInit() {
    this.flightService.getFlightLocations().subscribe({
      next: (data) => {
        this.fromStations = data.origins;
        this.toStations = data.destinations;
      },
      error: (err) => {
        console.error('Error loading flight locations', err);
      },
    });
  }

  search() {
    if (!this.from || !this.to || !this.date) {
      alert('Please select origin, destination, and date!');
      return;
    }

    this.router.navigate(['/booking'], {
      queryParams: {
        from: this.from,
        to: this.to,
        date: this.date,
      },
    });
  }
}
