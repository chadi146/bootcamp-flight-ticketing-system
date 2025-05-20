import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Flight {
departureTime: string|number|Date;
  id?: number; // optional when creating new flight
  flightNumber: string;
  origin: string;
  destination: string;
  date: Date;
  time: string;
  duration: string;
  price: number;
  seats: number;
}

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private apiUrl = 'http://localhost:5000/api/flights';

  constructor(private http: HttpClient) {}

  getFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  getFlightById(id: number): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${id}`);
  }

  createFlight(flightData: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.apiUrl, flightData);
  }

  // You can add update and delete methods here similarly
}
