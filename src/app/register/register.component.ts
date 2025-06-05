import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../models/role';
import { RegisterService } from '../services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  // This component is used for user registration
  // It can be extended with form controls and validation logic as needed

  constructor(private router:Router,private _service:RegisterService) { }

  register_form=new FormGroup({
    firstName: new FormControl('',[Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('',[Validators.required, Validators.minLength(2)]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    role: new FormControl('',[Validators.required]),
  });

  // Method to handle form submission
  onSubmit(form: FormGroup) {
    console.log('Form submitted:', form);
    if (form.value.role === Role.ADMIN) {
      this._service.signUp(form.value).subscribe({
        next: (data) => {
          console.log('Admin registered successfully:', data);
        },
        error: (error) => {
          console.error('Error registering admin:', error);
        }
      });
      this.router.navigate(['/gestion-absence']);
    }else {
      this._service.signUp(form.value).subscribe({
        next: (data) => {
          console.log('Employee registered successfully:', data);
        },
        error: (error) => {
          console.error('Error registering employee:', error);
        }
      });
      this.router.navigate(['/pointage']);
    }
    // Add logic to handle registration, e.g., call a service to save user data
  }
  // Method to reset the form
  resetForm(form: FormGroup) {
    form.reset();
    console.log('Form reset');
  }
  
}
