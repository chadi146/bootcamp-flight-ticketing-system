import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';

import { PurchaseComponent } from './pages/purchase/purchase.component';
import { BookingListComponent } from './pages/booking-list/booking-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'my-bookings', component: BookingListComponent }
];
