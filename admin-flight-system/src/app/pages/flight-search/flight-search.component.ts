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
    maxPrice: null as number | null, // 👈 Properly typed as number or null
  };

  allFlights: Flight[] = [];

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    this.flightService.getFlights().subscribe((flights) => {
      this.allFlights = flights.map((flight) => ({
        ...flight,
        departureTime: flight.departureTime ? new Date(flight.departureTime) : null,
      }));
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
    // Trigger change detection if needed
  }

  get filteredFlights(): Flight[] {
    const maxPrice = this.filters.maxPrice != null ? Number(this.filters.maxPrice) : null;

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
        (maxPrice === null || flight.price <= maxPrice)
      );
    });
  }
}
