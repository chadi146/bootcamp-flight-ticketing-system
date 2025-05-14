import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true ,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  flights: any[] = [];
  total: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get flight details and total price from queryParams
    this.route.queryParams.subscribe(params => {
      this.flights = JSON.parse(params['flights']);
      this.total = params['total'];
    });
  }

  confirmPayment(): void {
    alert('Payment successful!');
    // Clear booked flights from localStorage
    localStorage.removeItem('bookedFlights');
  }
}
