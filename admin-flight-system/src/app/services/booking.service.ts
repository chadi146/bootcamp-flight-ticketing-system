import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

interface CreateBookingPayload {
  userId: number;
  flightId: number;
}

export interface Booking {
payment: any;
  id: number;
  userId: number;
  flightId: number;
  status: string;
  bookingDate: string;
  totalPrice?: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:5000/bookings';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Get all bookings
  getBookings(): Observable<Booking[]> {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (!token) {
        return of([]); // Return empty observable if no token
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      return this.http.get<Booking[]>(this.apiUrl, { headers });
    } else {
      return of([]); // SSR-safe fallback
    }
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
