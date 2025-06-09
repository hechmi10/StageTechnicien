import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
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
    if (!form.valid) {
      Object.keys(form.controls).forEach(key => {
        form.get(key)?.markAsTouched();
      });
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    this.errorMessage = '';
    const { email, password } = form.value;

    console.log('Login attempt:', { email });

    this.authService.login(email, password).subscribe({
      next: (user) => {
        console.log('Login successful, user:', user);
        if (user && user.role) {
          const redirectUrl = user.role === Role.ADMIN ? '/gestion-absence' : '/pointage';
          this.router.navigate([redirectUrl]);
        } else {
          this.errorMessage = 'Login successful, but user role is undefined. Redirecting to default page.';
          this.router.navigate(['/pointage']); // Fallback redirect
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = 'Login failed. Please check your credentials or contact support.';
      }
    });
  }
}