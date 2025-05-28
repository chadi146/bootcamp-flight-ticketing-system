// src/app/services/payment.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  makePayment(paymentData: any) {
    return this.http.post(`${this.baseUrl}/payments`, paymentData);
  }

  deleteBooking(bookingId: number) {
    return this.http.delete(`${this.baseUrl}/bookings/${bookingId}`);
  }
}
