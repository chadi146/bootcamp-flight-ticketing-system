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
    const token = localStorage.getItem('token');
    if (!token) {
      this.message = 'User not logged in';
      return;
    }
  
    this.http.get<any>(`${environment.apiUrl}/bookings/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (booking) => {
        this.amount = booking.flight?.price?.toString() || '';
        this.flightOrigin = booking.flight?.origin || '';
        this.flightDestination = booking.flight?.destination || '';
        this.message = ''; // clear any previous errors
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
  
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
  
    if (!userStr || !token) {
      this.message = 'User not logged in';
      return;
    }
  
    const user = JSON.parse(userStr);
  
    const paymentData = {
      userId: user.id, // ✅ dynamic user ID
      bookingId: parseInt(this.bookingId),
      amount: parseFloat(this.amount),
      status: this.status,
    };
  
    this.http.post(`${environment.apiUrl}/payments/userpayment`, paymentData, {
      headers: {
        Authorization: `Bearer ${token}` // ✅ also include token
      }
    }).subscribe({
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
  
    const token = localStorage.getItem('token');
    if (!token) {
      this.message = 'User not logged in';
      return;
    }
  
    this.http.delete(`${environment.apiUrl}/bookings/${this.bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (res: any) => {
        this.message = res.message;
      },
      error: (err) => {
        this.message = err.error?.message || 'Delete failed';
      }
    });
  }
  
}
