import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  bookingId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id');
  }

  makePayment() {
    alert('Payment successful for booking ID: ' + this.bookingId);
  }
}
