import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'admin-token';

  login(email: string, password: string): boolean {
    // Simulate authentication logic
    if (email && password) {
      localStorage.setItem(this.tokenKey, 'fake-token');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
