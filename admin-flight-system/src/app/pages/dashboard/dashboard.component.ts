import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  stats = [
    { label: 'Users', value: 0 },
    { label: 'Bookings', value: 0 },
    { label: 'Flights', value: 0 },
    { label: 'Payments', value: 0 }
  ];

  recentBookings: Booking[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadRecentBookings();
    // Similarly load stats by calling Users, Flights, Payments services
  }

  loadRecentBookings() {
    this.bookingService.getBookings().subscribe({
      next: (bookings) => {
        this.recentBookings = bookings.slice(0, 5); // show recent 5 bookings
        this.stats.find(s => s.label === 'Bookings')!.value = bookings.length;
      },
      error: (err) => console.error('Failed to load bookings', err)
    });
  }
}
