import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private apiUrl = 'http://localhost:5000/api/flights/locations'; // Update with your actual backend URL

  constructor(private http: HttpClient) {}

  getStations(): Observable<string[]> {
    return this.http.get<{ origins: string[]; destinations: string[] }>(this.apiUrl).pipe(
      map((res) => {
        const merged = new Set([...res.origins, ...res.destinations]);
        return Array.from(merged); // remove duplicates
      })
    );
  }
}
