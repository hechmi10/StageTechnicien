import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { RegisterService } from '../services/register/register.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required])
  });
  errorMessage: string = '';

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private authService: AuthService
  ) {}

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.errorMessage = '';
      const { email, password, role } = form.value;

      console.log('Register attempt:', { email, role });

      this.registerService.signUp({ email, password, role }).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          // Store token and user
          this.authService.login(email, password).subscribe({
            next: () => {
              console.log('Auto-login successful');
              const redirectUrl = response.user.role === Role.ADMIN ? '/gestion-absence' : '/pointage';
              this.router.navigate([redirectUrl]);
            },
            error: (err) => {
              console.error('Auto-login error:', err);
              this.errorMessage = 'Registration succeeded, but login failed. Please log in manually.';
              this.router.navigate(['/login']);
            }
          });
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.errorMessage = 'Registration failed. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }

  resetForm(form: FormGroup) {
    form.reset();
    this.errorMessage = '';
    console.log('Form reset');
  }
}