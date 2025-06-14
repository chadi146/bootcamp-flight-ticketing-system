import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [CommonModule],
})
export class PaymentComponent implements OnInit {
  payments: any[] = [];
payers: any;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadWhoPaid();
    }
  }

  loadWhoPaid(): void {
    const token = localStorage.getItem('token');
    console.log('JWT Token:', token);

    if (!token) return;

    this.http.get<any[]>('http://localhost:5000/payments/with-user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: (res) => {
        console.log('Payments response:', res);
        this.payments = res;
      },
      error: (err) => {
        console.error('Failed to load payment user info', err);
      }
    });
  }
}
