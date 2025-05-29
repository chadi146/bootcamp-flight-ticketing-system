import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

    if (!isLoggedIn) {
      this.router.navigate(['/login']); // Redirect to admin login if not logged in
      return false;
    }
    return true;
  }
}
