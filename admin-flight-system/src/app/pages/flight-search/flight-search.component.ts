import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FlightService, Flight } from '../../services/flight.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {
  filters = {
    date: '',
    from: '',
    to: '',
    maxPrice: '',
  };

  allFlights: Flight[] = [];

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    this.flightService.getFlights().subscribe((flights) => {
      this.allFlights = flights;
    });
  }

  bookFlight(flightId?: number) {
    if (flightId === undefined) {
      console.warn('Flight ID is missing');
      return;
    }
    this.router.navigate(['/booking', flightId]);
  }

  onFilterChange() {
    // Optionally implement filter side effects here
  }

  get filteredFlights(): Flight[] {
    return this.allFlights.filter((flight) => {
      const depTimeStr =
        flight.departureTime instanceof Date
          ? flight.departureTime.toISOString()
          : String(flight.departureTime);

      return (
        (!this.filters.date || depTimeStr.startsWith(this.filters.date)) &&
        (!this.filters.from ||
          flight.origin.toLowerCase().includes(this.filters.from.toLowerCase())) &&
        (!this.filters.to ||
          flight.destination.toLowerCase().includes(this.filters.to.toLowerCase())) &&
        (!this.filters.maxPrice || flight.price <= +this.filters.maxPrice)
      );
    });
  }
}
