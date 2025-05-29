import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Flight {
  id?: number; // optional when creating new flight
  flightNumber: string;
  origin: string;
  destination: string;
  date: Date;
  time: string;
  duration: string;
  price: number;
  seats: number;
  departureTime: string | number | Date |null;
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

  deleteFlight(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Add updateFlight() if needed later
}
