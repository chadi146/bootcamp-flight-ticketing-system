import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewTicketComponent } from './pages/new-ticket/new-ticket.component';
import { UserComponent } from './pages/user/user.component';
import { FlightSearchComponent } from './pages/flight-search/flight-search.component';
import { PaymentComponent } from './pages/payment/payment.component';

// Export the routes to make it available for import in other files
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'new-ticket', component: NewTicketComponent },
      { path: 'flights', component: FlightSearchComponent },
      { path: 'payment', component: PaymentComponent },
    ]
  },
  { path: '**', redirectTo: 'login' } // fallback
];
