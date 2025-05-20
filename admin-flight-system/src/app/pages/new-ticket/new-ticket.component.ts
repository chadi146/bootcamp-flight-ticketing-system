import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlightService, Flight } from '../../services/flight.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule,HttpClientModule],
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss'],

})
export class NewTicketComponentt {
  flight = {
    flightNumber: '',
    origin: '',
    destination: '',
    date: '',
    time: '',
    duration: '',
    price: null as number | null,
    seats: null as number | null,
  };

  constructor(private flightService: FlightService, private router: Router) {}
  submitFlight() {
    const flightData: Flight = {
      ...this.flight,
      date: new Date(this.flight.date),
      price: this.flight.price ?? 0, // fallback to 0 if null
      seats: this.flight.seats ?? 0,
      departureTime: this.flight.time || ''
    };

    console.log('Sending flight data:', flightData); // <-- Add
    this.flightService.createFlight(flightData).subscribe({
      next: (res: any) => {
        console.log('Flight created:', res);
        this.router.navigate(['/flights']); // Or wherever you want to go after adding
      },
      error: (err: any) => {
        console.error('Failed to create flight:', err);
        // handle error display
      },
    });
  }
}
