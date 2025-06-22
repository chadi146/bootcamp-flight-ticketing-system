import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Flight {
  id: number;
  airline: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price: number;
  seats: number;
  departureTime?: Date;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  from: string = '';
  to: string = '';
  date: string = '';
  flights: Flight[] = [];
  message: string | undefined;
  loadingFlightId: number | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.from = params['from'] || '';
      this.to = params['to'] || '';
      this.date = params['date'] || '';

      const queryParams: any = {};
      if (this.from) queryParams.from = this.from;
      if (this.to) queryParams.to = this.to;
      if (this.date) queryParams.date = this.date;

      const queryString = new URLSearchParams(queryParams).toString();
      const url = `${environment.apiUrl}/api/flights${queryString ? '?' + queryString : ''}`;

      this.http.get<Flight[]>(url).subscribe({
        next: (flights) => {
          this.flights = flights;
          this.message = undefined;
        },
        error: (err) => {
          console.error('Failed to load flights:', err);
          this.flights = [];
          this.message = 'Failed to load flights. Please try again later.';
        }
      });
    });
  }

  bookNow(flight: Flight) {
    if (flight.seats === 0) return;  // safety check

    const token = localStorage.getItem('token');
    if (!token) {
      this.message = 'You must be logged in to book a flight.';
      return;
    }

    this.loadingFlightId = flight.id;

    const bookingData = { flightId: flight.id };

    this.http.post(`${environment.apiUrl}/bookings`, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (response: any) => {
        this.message = 'Booking successful!';
        // Decrement seats for immediate UI update
        flight.seats = Math.max(flight.seats - 1, 0);
        this.loadingFlightId = null;
        this.router.navigate(['/purchase'], { queryParams: { bookingId: response.id } });
      },
      error: (err) => {
        this.message = err.error?.message || 'Booking failed';
        this.loadingFlightId = null;
      }
    });
  }
}
