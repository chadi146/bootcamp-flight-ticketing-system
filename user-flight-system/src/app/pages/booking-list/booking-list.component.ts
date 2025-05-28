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
    const userId = 1; // Replace this with actual user ID from auth

    this.http.get<any[]>(`${environment.apiUrl}/bookings/my`).subscribe({
      next: (data) => {
        this.bookings = data;
      },
      error: (err) => {
        console.error('Failed to fetch bookings', err);
        this.message = 'Error fetching bookings';
      }
    });
  }

  deleteBooking(id: number) {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    this.http.delete(`${environment.apiUrl}/bookings/${id}`).subscribe({
      next: (res: any) => {
        this.message = res.message || 'Booking deleted successfully';
        this.bookings = this.bookings.filter(b => b.id !== id);
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.message = err.error?.message || 'Failed to delete booking';
      }
    });
  }
}
