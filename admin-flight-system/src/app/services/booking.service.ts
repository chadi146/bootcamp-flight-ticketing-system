import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CreateBookingPayload {
  userId: number;
  flightId: number;
}

export interface Booking {
  id: number;
  userId: number;
  flightId: number;
  status: string;
  bookingDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl =  'http://localhost:5000/bookings';  // Adjust your API base URL here

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  createBooking(payload: CreateBookingPayload): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, payload);
  }
}
