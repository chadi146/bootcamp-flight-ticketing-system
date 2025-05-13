import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    { label: 'Users', value: 124 },
    { label: 'Bookings', value: 87 },
    { label: 'Flights', value: 15 },
    { label: 'Payments', value: 63 }
  ];

  recentBookings = [
    { user: 'Alice', flight: 'A123', status: 'Confirmed' },
    { user: 'Bob', flight: 'B456', status: 'Pending' },
    { user: 'Charlie', flight: 'C789', status: 'Cancelled' },
    { user: 'David', flight: 'D012', status: 'Confirmed' },
    { user: 'Eve', flight: 'E345', status: 'Pending' }
  ];
}
