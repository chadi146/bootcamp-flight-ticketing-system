import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface Flight {
  id: number;
  airline: string;
  time: string;
  price: number;
}

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  flights: Flight[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Fetch the booked flights from the API
    this.http.get<Flight[]>(`${environment.apiUrl}/bookings`)
      .subscribe(response => {
        this.flights = response;
      }, error => {
        console.error('Error fetching bookings', error);
      });
  }

  get total(): number {
    return this.flights.reduce((sum, flight) => sum + flight.price, 0);
  }

  deleteFlight(flightId: number) {
    // Make an API call to delete the flight booking
    this.http.delete(`${environment.apiUrl}/bookings/${flightId}`)
      .subscribe(response => {
        // After deleting, fetch updated bookings
        this.flights = this.flights.filter(flight => flight.id !== flightId);
      }, error => {
        console.error('Error deleting flight', error);
      });
  }

  completePurchase() {
    alert('Purchase completed!');
    this.router.navigate(['/']);
  }
}
