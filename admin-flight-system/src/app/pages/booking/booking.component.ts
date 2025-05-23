import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  flightId!: number;
  flight?: Flight;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private flightService: FlightService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('flightId');
    if (id) {
      this.flightId = +id;
      this.loadFlight();
    } else {
      this.error = 'Invalid flight ID.';
    }
  }

  loadFlight(): void {
    this.flightService.getFlightById(this.flightId).subscribe({
      next: (flight) => this.flight =undefined,
      error: () => this.error = 'Flight not found.'
    });
  }

  bookFlight(): void {
    if (!this.flight?.id) {
      this.error = 'Invalid flight information.';
      return;
    }

    this.loading = true;

    const userId = 1; // Replace with real user id when auth is implemented

    const payload: CreateBookingPayload = {
      userId,
      flightId: this.flight.id,
    };

    this.bookingService.createBooking(payload).subscribe({
      next: (booking) => {
        console.log('Booking created with ID:', booking.id);
        this.loading = false;
        this.router.navigate(['/booking', booking.id]);
      },
      error: () => {
        this.loading = false;
        this.error = 'Booking failed. Please try again later.';
      }
    });
  }
}

// Local Flight interface
interface Flight {
  id: number;
  flightNumber: string;
  origin: string;
  destination: string;
  date: Date;
  time: string;
  price: number;
}

// Booking creation DTO
interface CreateBookingPayload {
  userId: number;
  flightId: number;
}

// Booking response (optional, for later use)
interface Booking {
  id: number;
  userId: number;
  flightId: number;
  status: string;
  bookingDate: string;
}
