import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  flightId: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.flightId = this.route.snapshot.paramMap.get('id');
  }

  confirmBooking() {
    const mockBookingId = 'ABC123'; // Simulate creating a booking
    this.router.navigate(['/payment', mockBookingId]);
  }
}
