import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CreateBookingPayload {
  userId: number;
  flightId: number;
}

export interface Booking {
  id : number;
  userId: number;
  flightId: number;
  status: string;
  bookingDate: string;
  totalPrice?: number; // add this if your booking includes price info
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/bookings';  // Adjust your API base URL here

  constructor(private http: HttpClient) {}

  // Get all bookings
  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.apiUrl);
  }

  // Get single booking by id
  getBooking(bookingId: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${bookingId}`);
  }

  // Create a new booking
  createBooking(payload: CreateBookingPayload): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, payload);
  }
}
