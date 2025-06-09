import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'; // Use AuthService
import { Role } from '../models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin(form: FormGroup) {
    if (form.valid) {
      this.errorMessage = '';
      const { email, password } = form.value;

      console.log('Login attempt:', { email });

      this.authService.loginEmployee(email, password).subscribe({
        next: (user) => {
          console.log('Login successful:', user);
          const redirectUrl = user.role === Role.ADMIN ? '/gestion-absence' : '/pointage';
          this.router.navigate([redirectUrl]);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}