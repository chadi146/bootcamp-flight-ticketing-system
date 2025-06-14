import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];
  message = '';
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      this.message = 'User not logged in.';
      return;
    }

    this.http.get<any[]>(`${environment.apiUrl}/bookings/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).subscribe({
      next: (data) => {
        this.bookings = data;
        this.message = '';
      },
      error: (err) => {
        console.error('Failed to fetch bookings', err);
        this.message = err.error?.message || 'Error fetching bookings';
      }
    });
  }

  deleteBooking(id: number) {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      this.message = 'User not logged in.';
      return;
    }
  
    this.http.delete(`${environment.apiUrl}/payments/cancel/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Booking cancelled successfully';
        this.bookings = this.bookings.map(b =>
          b.id === id ? { ...b, status: 'cancelled' } : b
        );
      },
      error: (err) => {
        console.error('Cancellation failed', err);
        this.message = err.error?.message || 'Failed to cancel booking';
      }
    });
  }
  
}
