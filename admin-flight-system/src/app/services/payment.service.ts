// payment.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Payment {
  id: number;
  bookingId: number;
  amount: number;
  status: string;
  paymentDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:5000/payments'; // Change to your backend URL

  constructor(private http: HttpClient) {}

  createPayment(data: { bookingId: number; amount: number }): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, data);
  }

  getPaymentByBooking(bookingId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/booking/${bookingId}`);
  }
}
