import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';  // adjust path as needed

@Injectable({ providedIn: 'root' })
export class FlightService {
  private baseUrl = `${environment.apiUrl}/api/flights`;

  constructor(private http: HttpClient) {}

  searchFlights(from: string, to: string, date: string) {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('date', date);

    return this.http.get<any[]>(`${this.baseUrl}/search`, { params });
  }
  getFlightLocations() {
    return this.http.get<{ origins: string[]; destinations: string[] }>(
      'http://localhost:5000/api/flights/locations'
    );
  }
  
  
}
