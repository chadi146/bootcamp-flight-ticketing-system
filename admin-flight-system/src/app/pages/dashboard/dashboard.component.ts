import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  recentBookings: any[] = [];

  constructor(private bookingService: BookingService, private http: HttpClient) {}

  ngOnInit() {
    this.loadRecentBookings();
    this.loadFlightCount(); // call it to load flights count
    this.loadPaymentCount();
    this.loadUserCount();
  }

  loadRecentBookings() {
    this.bookingService.getBookings().subscribe({
      next: (bookings: any[]) => {
        this.recentBookings = bookings.slice(0, 5);
        const bookingStat = this.stats.find(s => s.label === 'Bookings');
        if (bookingStat) {
          bookingStat.value = bookings.length;
        }
      },
      error: (err: any) => console.error('Failed to load bookings', err)
    });
  }

  loadFlightCount() {
    this.http.get<{ count: number }>('http://localhost:5000/api/flights/count')
      .subscribe({
        next: (res: { count: number; }) => {
          const flightStat = this.stats.find(stat => stat.label === 'Flights'); // label corrected to 'Flights'
          if (flightStat) {
            flightStat.value = res.count;
          }
        },
        error: (err: any) => {
          console.error('Failed to load flight count', err);
        }
      });
  }
  loadPaymentCount() {
    this.http.get<{ count: number }>('http://localhost:5000/payments/count')
      .subscribe({
        next: (res: { count: number }) => {
          const paymentStat = this.stats.find(stat => stat.label === 'Payments');
          if (paymentStat) {
            paymentStat.value = res.count;
          }
        },
        error: (err: any) => {
          console.error('Failed to load payment count', err);
        }
      });
  }
  

  loadUserCount() {
    this.http.get<{ count: number }>('http://localhost:5000/api/users/count')
      .subscribe({
        next: (res) => {
          const userStat = this.stats.find(s => s.label === 'Users');
          if (userStat) {
            userStat.value = res.count;
          }
        },
        error: (err) => console.error('Failed to load user count', err)
      });
  }
  
}
