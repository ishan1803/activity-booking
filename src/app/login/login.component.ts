import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          const token: string = response;
          const payloadStr = token.split('.');
          const tokenPayload = JSON.parse(atob(payloadStr[1]));
          const userRole = tokenPayload.role;

          // Show success alert message
          alert('Login successful. Welcome back!');

          // Redirect after 2 seconds
          setTimeout(() => {
            if (userRole === 'ADMIN' || userRole === 'CUSTOMER') {
              this.router.navigate(['/allActivities']);
            } else if (userRole === 'EXPERT') {
              this.router.navigate(['/allActivitiesExpert']);
            }
          }, 200);
        },
        error: (error) => {
          // Show error alert message
          alert('Login failed. Please try again.');
          console.log('Login Error: ', error);
        },
      });
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
