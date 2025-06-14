import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'new-ticket',
        loadComponent: () =>
          import('./pages/new-ticket/new-ticket.component').then(m => m.NewTicketComponentt)
      },
      {
        path: 'flights',
        loadComponent: () =>
          import('./pages/flight-search/flight-search.component').then(m => m.FlightSearchComponent)
      },
      {
        path: 'booking',
        loadComponent: () =>
          import('./pages/booking/booking.component').then(m => m.BookingListComponent)
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./pages/payment/payment.component').then(m => m.PaymentComponent)
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
