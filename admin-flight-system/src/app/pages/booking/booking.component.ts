import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BookingService, Booking } from '../../services/booking.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];

  private bookingService = inject(BookingService);

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe({
      next: (res) => {
        this.bookings = res;
      },
      error: (err) => {
        console.error('Failed to load bookings', err);
      },
    });
  }
}
