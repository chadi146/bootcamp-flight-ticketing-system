import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IStation } from '../modules/station';

@Injectable({
  providedIn: 'root'
})
export class StationsService {
  private apiUrl = ''; //replace it with real backend url
  constructor(private http: HttpClient) { }

  getStations(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  getAllStations(): Observable<IStation[]>{
    return this.http.get<IStation[]>(this.apiUrl);
  }

}
