import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService,Payment } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  bookingId: string | null = null;

  // For demo: hardcode userId and amount or get from your app state
  userId = 1;  
  amount = 100; // example amount, you might want to fetch real amount based on booking

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.bookingId = this.route.snapshot.paramMap.get('id');
  }

  makePayment() {
    if (!this.bookingId) {
      alert('Booking ID not found');
      return;
    }

    const paymentData: Partial<Payment> = {
      // userId: this.userId,
      bookingId: this.bookingId,
      amount: this.amount,
      status: 'COMPLETED'  // or 'PENDING' depending on your flow
    };

    this.paymentService.createPayment(paymentData).subscribe({
      next: (response) => {
        alert('Payment successful! Payment ID: ' + response.payment.id);
      },
      error: (error) => {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
      }
    });
  }
}
