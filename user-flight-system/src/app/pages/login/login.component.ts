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
      max-width: 400px;
      margin: 80px auto;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
      background-color: #ffffff;
      text-align: center;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  
    .login-container h2 {
      font-size: 1.75rem;
      margin-bottom: 1.5rem;
      color: #1e293b;
    }
  
    input {
      width: 100%;
      padding: 12px;
      margin-bottom: 1rem;
      font-size: 1rem;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background-color: #f8fafc;
      transition: border-color 0.3s ease, background-color 0.3s ease;
      box-sizing: border-box;
    }
  
    input:focus {
      border-color: #38bdf8;
      background-color: #ffffff;
      outline: none;
    }
  
    button {
      width: 100%;
      padding: 12px;
      font-size: 1rem;
      font-weight: 600;
      background-color: #0ea5e9;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      margin-top: 1rem;
    }
  
    button:hover:not(:disabled) {
      background-color: #0284c7;
    }
  
    button:disabled {
      background-color: #94a3b8;
      cursor: not-allowed;
    }
  
    .error {
      color: #dc2626;
      margin-top: 1rem;
      font-size: 0.95rem;
    }
  
    .register-link {
      margin-top: 1.5rem;
      font-size: 0.95rem;
    }
  
    .register-link a {
      color: #0ea5e9;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
  
    .register-link a:hover {
      color: #0284c7;
      text-decoration: underline;
    }
  
    @media (max-width: 500px) {
      .login-container {
        margin: 40px 16px;
        padding: 1.5rem;
      }
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
