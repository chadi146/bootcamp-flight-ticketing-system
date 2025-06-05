import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
      max-width: 350px;
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
    button:hover {
      background-color: #0056b3;
    }
    .error {
      color: red;
      margin-top: 10px;
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
      role: 'user' // Force default role
    };

    this.http.post(`${environment.apiUrl}/api/users/register`, userData).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.error = err?.error?.message || 'Registration failed';
      }
    });
  }
}
