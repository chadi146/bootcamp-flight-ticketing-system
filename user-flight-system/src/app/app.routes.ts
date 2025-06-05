import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from '../../src/app/auth.guard'; // ⬅️ import your guard

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // ⬇️ Protected routes
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
  { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'my-bookings', component: BookingListComponent, canActivate: [AuthGuard] },
];
