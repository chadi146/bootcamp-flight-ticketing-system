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
        Don't have an account? <a href="#" (click)="navigateRegister($event)">Register here</a>

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
    }
    input {
      width: 100%;
      margin: 10px 0;
      padding: 8px;
      font-size: 1rem;
    }
    button {
      width: 100%;
      padding: 10px;
      margin-top: 15px;
      font-size: 1rem;
      cursor: pointer;
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
    }
  `]
})
export class LoginComponent {
  navigateRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['/register']);
  }
  
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.error = '';
    this.loading = true;

    if (!this.email || !this.password) {
      this.error = 'Please enter email and password';
      this.loading = false;
      return;
    }

    this.http.post<{ user: any }>(`${environment.apiUrl}/api/users/login`, {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/home']); // Or your default route
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}
