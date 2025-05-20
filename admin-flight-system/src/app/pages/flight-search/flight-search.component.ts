import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlightService, Flight } from '../../services/flight.service'; // ✅ Make sure this path is correct

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],

})
export class FlightSearchComponent implements OnInit {
onFilterChange() {
throw new Error('Method not implemented.');
}
  filters = {
    date: '',
    from: '',
    to: '',
    maxPrice: '',
  };

  allFlights: Flight[] = []; // ✅ This is needed to store all fetched flights

  constructor(private flightService: FlightService) {}

  ngOnInit(): void {
    this.flightService.getFlights().subscribe((flights) => {
      this.allFlights = flights;
    });
  }

  get filteredFlights(): Flight[] {
    return this.allFlights.filter((flight) => {
      const depTimeStr = flight.departureTime instanceof Date
        ? flight.departureTime.toISOString()
        : String(flight.departureTime);

      return (
        (!this.filters.date || depTimeStr.startsWith(this.filters.date)) &&
        (!this.filters.from || flight.origin.toLowerCase().includes(this.filters.from.toLowerCase())) &&
        (!this.filters.to || flight.destination.toLowerCase().includes(this.filters.to.toLowerCase())) &&
        (!this.filters.maxPrice || flight.price <= +this.filters.maxPrice)
      );
    });
  }

}
