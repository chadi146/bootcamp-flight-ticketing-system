import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Payment {
  payment: any;
  id?: number;
  bookingId: number;
  amount: number;
  status: string;
  paymentDate?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:5000/payments'; // Update with your backend URL

  constructor(private http: HttpClient) {}

  // Create payment
  createPayment(paymentData: Partial<Payment>): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, paymentData);
  }

  // Get all payments
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  // Get payment by id
  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  // Update payment status
  updatePaymentStatus(id: number, status: string): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${id}/status`, { status });
  }

  // Delete payment
  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
