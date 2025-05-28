import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  bookingId = '';
  amount = '';
  status = 'accepted';
  message = '';
  flightOrigin: string = '';
  flightDestination: string = '';

  private router = inject(Router);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['bookingId']) {
        this.bookingId = params['bookingId'];
        this.loadBookingDetails(this.bookingId);
      } else {
        this.message = 'No booking ID provided';
      }
    });
  }

  loadBookingDetails(id: string) {
    this.http.get<any>(`${environment.apiUrl}/bookings/${id}`).subscribe({
      next: (booking) => {
        this.amount = booking.flight?.price?.toString() || '';
        this.flightOrigin = booking.flight?.origin || '';
        this.flightDestination = booking.flight?.destination || '';
      },
      error: (err) => {
        console.error('Failed to load booking details', err);
        this.message = 'Failed to load booking details';
      }
    });
  }

  makePayment() {
    if (!this.bookingId) {
      this.message = 'No booking ID provided';
      return;
    }

    const paymentData = {
      userId: 1, // Replace with actual user id
      bookingId: parseInt(this.bookingId),
      amount: parseFloat(this.amount),
      status: this.status,
    };

    this.http.post(`${environment.apiUrl}/payments`, paymentData).subscribe({
      next: (res: any) => {
        this.message = res.message;
      },
      error: (err) => {
        this.message = err.error?.message || 'Payment failed';
      }
    });
  }

  deleteBooking() {
    if (!this.bookingId) {
      this.message = 'No booking ID provided';
      return;
    }

    this.http.delete(`${environment.apiUrl}/bookings/${this.bookingId}`).subscribe({
      next: (res: any) => {
        this.message = res.message;
      },
      error: (err) => {
        this.message = err.error?.message || 'Delete failed';
      }
    });
  }
}
