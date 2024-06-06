import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; // Make sure this import path is correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService]  // Ensure AuthService is provided here
})
export class SignupComponent {
  signupForm: FormGroup;
  roles = ['CUSTOMER', 'EXPERT'];

  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log('Form Submitted!', this.signupForm.value);
      this.authService.signup(this.signupForm.value).subscribe({
        next: (response: any) => {
          alert('Signup successful! Welcome to our community. You can now log in with your new account.');
          setTimeout(() => {
            console.log("Signup Success -> " + JSON.stringify(response));
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 100);
          }, 200);
        },
        error: (error: any) => {
         
          console.log("Signup Error: " + JSON.stringify(error));
          alert('Signup failed! Please try again.');
        },
      });
    }
  }
}
