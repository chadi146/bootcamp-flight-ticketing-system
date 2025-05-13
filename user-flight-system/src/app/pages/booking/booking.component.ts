<<<<<<< HEAD
import { Component, inject ,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  flights: Flight[] =  [];

  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.from = params['from'];
      this.to = params['to'];
      this.date = params['date'];

      // Replace this with API data later
      this.flights = [
        { airline: 'SkyJet', price: 220,time: '10:30 AM', id: 1 },
        { airline: 'AirCloud', price: 180,time: '02:15 9M', id: 2 }
      ];
    });
=======
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
>>>>>>> feature/admin-dashboard
  }
}
