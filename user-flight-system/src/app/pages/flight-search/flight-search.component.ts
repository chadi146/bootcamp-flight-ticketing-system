import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent {
  filters = {
    date: '',
    from: '',
    to: '',
    maxPrice: ''
  };

  allFlights = [
    { id: 1, from: 'Paris', to: 'London', date: '2025-05-10', time: '10:00', price: 120 },
    { id: 2, from: 'New York', to: 'Toronto', date: '2025-05-11', time: '13:00', price: 250 },
    { id: 3, from: 'Tokyo', to: 'Seoul', date: '2025-05-10', time: '15:30', price: 150 },
    { id: 4, from: 'Berlin', to: 'Rome', date: '2025-05-12', time: '08:45', price: 100 },
    { id: 5, from: 'Madrid', to: 'Lisbon', date: '2025-05-11', time: '11:20', price: 90 }
  ];

  get filteredFlights() {
    return this.allFlights.filter(flight =>
      (!this.filters.date || flight.date === this.filters.date) &&
      (!this.filters.from || flight.from.toLowerCase().includes(this.filters.from.toLowerCase())) &&
      (!this.filters.to || flight.to.toLowerCase().includes(this.filters.to.toLowerCase())) &&
      (!this.filters.maxPrice || flight.price <= +this.filters.maxPrice)
    );
  }
}
