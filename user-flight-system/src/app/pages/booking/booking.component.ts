import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Flight {
  id: number;
  airline: string;
  time: string;
  price: number;
}

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  from: string = '';
  to: string = '';
  date: string = '';
  flights: Flight[] = [];

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient); // Inject HttpClient to call the API

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.from = params['from'];
      this.to = params['to'];
      this.date = params['date'];

      // Replace this with API data later
      this.flights = [
        { airline: 'SkyJet', price: 220, time: '10:30 AM', id: 1 },
        { airline: 'AirCloud', price: 180, time: '02:15 PM', id: 2 }
      ];
    });
  }

  //  Book Now method
  bookNow(flight: Flight) {
    const bookingData = {
      airline: flight.airline,
      time: flight.time,
      price: flight.price,
      from: this.from,
      to: this.to,
      date: this.date
    };

    // Make an API call to save the booking
    this.http.post(`${environment.apiUrl}/bookings/book`, bookingData)
      .subscribe(response => {
        console.log('Booking successful', response);
        this.router.navigate(['/purchase']);
      }, error => {
        console.error('Booking error', error);
      });
  }
}
