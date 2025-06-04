import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { LoginService } from '../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router,private _service:LoginService) { }
  login_form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });
  onLogin(form: FormGroup) {
    if (form.valid) {
      const email = form.value.email;
      const password = form.value.password;
      console.log('Login successful for:', email);
      this._service.loginEmployee(email).subscribe({
        next: (data) => {
          console.log('Employee logged in successfully:', data);
          this.router.navigate(['/pointage']);
        },
        error: (error) => {
          console.error('Error logging in employee:', error);
        }
      });
    }
  }
}
