import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="register-container">
      <h2>Create Account</h2>
      <input [(ngModel)]="name" placeholder="Name" type="text" />
      <input [(ngModel)]="email" placeholder="Email" type="email" />
      <input [(ngModel)]="password" placeholder="Password" type="password" />
      <button (click)="register()">Register</button>
      <p class="error" *ngIf="error">{{ error }}</p>
    </div>
  `,
 styles: [`
  .register-container {
    max-width: 400px;
    margin: 80px auto;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
    background-color: #ffffff;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .register-container h2 {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
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
    background-color: #fff;
    outline: none;
  }

  button {
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    font-weight: 600;
    color: #ffffff;
    background-color: #0ea5e9;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
  }

  button:hover {
    background-color: #0284c7;
  }

  .error {
    margin-top: 1rem;
    color: #dc2626;
    font-size: 0.95rem;
  }

  @media (max-width: 500px) {
    .register-container {
      margin: 40px 16px;
      padding: 1.5rem;
    }
  }
`]


})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (!this.name || !this.email || !this.password) {
      this.error = 'All fields are required';
      return;
    }

    const userData = {
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password,
      role: 'user' // default role
    };

    this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, userData).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Registration failed';
      }
    });
  }
}
