import { Routes } from '@angular/router';
<<<<<<< HEAD
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'admin', component: AdminComponent }
=======
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
>>>>>>> feature/admin-dashboard
];
