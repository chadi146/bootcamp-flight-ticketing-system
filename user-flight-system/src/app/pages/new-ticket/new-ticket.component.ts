import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.scss']
})
export class NewTicketComponent {
  booking = {
    user: '',
    flight: '',
    date: '',
    status: 'Pending'
  };

  submitBooking() {
    console.log('Booking submitted:', this.booking);
    // Add your booking logic here
  }
}
