import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Flight {
  id: number;
  airline: string;
  from: string;
  to: string;
  date: string;
  time: string;
  price: number;
  seats: number;
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

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  message: string | undefined;

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
        },
        error: (err) => {
          console.error('Failed to load flights:', err);
          this.flights = [];
        }
      });
    });
  }

  bookNow(flight: Flight) {
    const bookingData = { flightId: flight.id };
  
    this.http.post(`${environment.apiUrl}/bookings`, bookingData).subscribe({
      next: (response: any) => {
        this.message = 'Booking successful!';
    
        // Assuming response.id is the new booking ID
        const bookingId = response.id;
    
        // Navigate to purchase page with bookingId as query param
        this.router.navigate(['/purchase'], { queryParams: { bookingId } });
      },
      error: (err) => {
        this.message = err.error?.message || 'Booking failed';
      }
    });
    
  }
  
  
  
}
