// payment.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment.service';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  bookingId!: number;
  amount!: number;
  paymentStatus: string = 'Not Paid';

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookingId = Number(this.route.snapshot.paramMap.get('bookingId')?? 0);
    // Fetch booking details (to get amount)
    this.bookingService.getBooking(this.bookingId).subscribe((booking) => {
      this.amount = booking.totalPrice ?? 0;
    });

    // Optionally fetch payment status
    this.paymentService.getPaymentByBooking(this.bookingId).subscribe(
      (payment) => {
        this.paymentStatus = payment.status;
      },
      () => {
        this.paymentStatus = 'Not Paid';
      }
    );
  }

  makePayment() {
    this.paymentService.createPayment({ bookingId: this.bookingId, amount: this.amount }).subscribe({
      next: (payment) => {
        this.paymentStatus = payment.status;
        alert('Payment successful!');
        // Redirect or update UI as needed
      },
      error: () => alert('Payment failed, please try again.'),
    });
  }
}
