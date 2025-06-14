import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class MyProfileComponent implements OnInit {
  user: any = null;
  bookings: any[] = [];

  upcomingFlights: any[] = [];
  pastFlights: any[] = [];

  searchTerm: string = '';
  filterStatus: string = 'all';

  private apiUrl = 'http://localhost:5000/bookings';  // Change to your backend URL

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUser();
    if (this.user) {
      this.loadBookings();
    }
  }

  loadUser() {
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
  }

  loadBookings() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.get<any[]>(`${this.apiUrl}/my`, { headers })
      .pipe(
        catchError(err => {
          console.error('Failed to load bookings:', err);
          alert('Failed to load bookings. Please try again later.');
          return of([]);
        })
      )
      .subscribe(bookings => {
        this.bookings = bookings.map(b => ({
          bookingId: b.id,
          flightNumber: b.flight.flightNumber,
          origin: b.flight.origin,
          destination: b.flight.destination,
          date: new Date(b.flight.date),
          status: b.status,
          paymentAmount: b.payment ? b.payment.amount : 0,
        }));
        this.filterFlights();
      });
  }

  filterFlights() {
    const term = this.searchTerm.toLowerCase();

    const filtered = this.bookings.filter(b => {
      const matchesSearch =
        b.flightNumber.toLowerCase().includes(term) ||
        b.origin.toLowerCase().includes(term) ||
        b.destination.toLowerCase().includes(term);

      const matchesStatus =
        this.filterStatus === 'all' || b.status === this.filterStatus;

      return matchesSearch && matchesStatus;
    });

    const now = new Date();

    this.upcomingFlights = filtered.filter(f => new Date(f.date) >= now);
    this.pastFlights = filtered.filter(f => new Date(f.date) < now);
  }

  downloadTicket(flight: any) {
    alert(`Downloading ticket for Flight #${flight.flightNumber}`);
    // Implement your actual download logic here
  }

  cancelBooking(bookingId: number) {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not authenticated. Please log in.');
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.delete(`${this.apiUrl}/cancel/${bookingId}`, { headers })
      .pipe(
        catchError(err => {
          console.error('Cancel booking failed:', err);
          alert('Failed to cancel booking. Please try again.');
          return of(null);
        })
      )
      .subscribe(res => {
        if (res) {
          alert('Booking cancelled successfully.');
          this.loadBookings();
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  }
}
