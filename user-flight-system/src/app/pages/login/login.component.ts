import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <h2>Login</h2>

      <input [(ngModel)]="email" placeholder="Email" type="email" />
      <input [(ngModel)]="password" placeholder="Password" type="password" />

      <button (click)="login()" [disabled]="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <p class="error" *ngIf="error">{{ error }}</p>
      <p class="register-link">
        Don't have an account? 
        <a href="#" (click)="navigateRegister($event)">Register here</a>
      </p>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 320px;
      margin: 100px auto;
      padding: 2rem;
      border: 1px solid #ccc;
      border-radius: 6px;
      text-align: center;
      background-color: #f9f9f9;
    }
    input {
      width: 100%;
      margin: 10px 0;
      padding: 8px;
      font-size: 1rem;
      box-sizing: border-box;
    }
    button {
      width: 100%;
      padding: 10px;
      margin-top: 15px;
      font-size: 1rem;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
    }
    button:disabled {
      background-color: #999;
      cursor: not-allowed;
    }
    .error {
      color: red;
      margin-top: 10px;
    }
    .register-link {
      margin-top: 15px;
    }
    a {
      color: #007bff;
      text-decoration: none;
      cursor: pointer;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  navigateRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }

  login() {
    this.error = '';
    this.loading = true;

    if (!this.email.trim() || !this.password.trim()) {
      this.error = 'Please enter email and password';
      this.loading = false;
      return;
    }

    this.http.post<{ token: string; user: any }>(`${environment.apiUrl}/auth/login`, {
      email: this.email.trim(),
      password: this.password
    }).subscribe({
      next: (res) => {
        // Save token and user
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
    
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
    
  }
}
