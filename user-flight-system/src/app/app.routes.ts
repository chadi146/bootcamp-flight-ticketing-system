import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';

import { PurchaseComponent } from './pages/purchase/purchase.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // 👈 Redirect root to login
  { path: 'login', component: LoginComponent },          // 👈 Login route first
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'my-bookings', component: BookingListComponent }
];
