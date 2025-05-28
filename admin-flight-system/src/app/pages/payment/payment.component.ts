import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService, Payment } from '../../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  bookingId!: number;

  // For demo: hardcode userId and amount or get from your app state
  userId = 1;  
  amount = 100; // Example amount. Ideally fetch based on booking ID

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookingId = +id; // Convert to number
    } else {
      alert('Invalid booking ID');
    }
  }

  makePayment(): void {
    if (!this.bookingId) {
      alert('Booking ID not found');
      return;
    }

    const paymentData: Partial<Payment> = {
      bookingId: this.bookingId,
      amount: this.amount,
      status: 'COMPLETED'  // or 'PENDING' based on your flow
    };

    this.paymentService.createPayment(paymentData).subscribe({
      next: (response) => {
        alert('Payment successful! Payment ID: ' + response.id);
      },
      error: (error) => {
        console.error('Payment failed:', error);
        alert('Payment failed. Please try again.');
      }
    });
  }
}
