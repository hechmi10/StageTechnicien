import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee/employee.service';
import { GestionCongeService } from '../services/conge/gestion-conge.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionAutorisationService } from '../services/autorisation/gestion-autorisation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  newConge: any = { employe: '', dateDebut: '', dateFin: '', nbJours: 0, raison: '' };
  employees: any[] = [];
  conges: any[] = [];
  autorisations: any[] = [];
  showCreateCongeModal = false;
  showCreateAutorisationModal = false;

  constructor(public authService: AuthService,
    private _employeeService:EmployeeService,
    private _congeService:GestionCongeService,
  private _autorisationService:GestionAutorisationService) {}

  ngOnInit() {
    this.loadEmployees();
    
  }
  loadEmployees() {
    this._employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }

  openCreateCongeModal() {
    this.newConge = { employe: '', dateDebut: '', dateFin: '', raison: '' };
    this.showCreateCongeModal = true;
  }

  closeCreateCongeModal() {
    this.showCreateCongeModal = false;
  }

  createConge() {
    // Find the employee object by email
    const selectedEmployee = this.employees.find(emp => emp.email === this.newConge.employe);
    if (!selectedEmployee) {
      alert('Veuillez sélectionner un employé valide.');
      return;
    }

    // Convert date strings to Date objects
    const dateDebut = this.newConge.dateDebut ? new Date(this.newConge.dateDebut) : undefined;
    const dateFin = this.newConge.dateFin ? new Date(this.newConge.dateFin) : undefined;

    // Calculate number of days
    const nbJours = (dateDebut && dateFin) ? this.dateDiff(dateDebut, dateFin) : 0;

    // Prepare the object to send
    const congeToSend = {
      ...this.newConge,
      employe: selectedEmployee,
      dateDebut,
      dateFin,
      nbJours
    };

    this._congeService.createConge(congeToSend).subscribe({
      next: (data) => {
        this.conges.push(data);
        this.closeCreateCongeModal();
      },
      error: (error) => {
        console.error('Error creating conge:', error);
      }
    });
  }

  dateDiff(dateDebut: string | Date, dateFin: string | Date): number {
    if (!dateDebut || !dateFin) return 0;
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diffTime = fin.getTime() - debut.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  }

  createAutorisationForm: FormGroup = new FormGroup({
      employee: new FormControl(null, Validators.required),
      dateAutorisation: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required)
    });

     // Create
  openCreateAutorisationModal() {
  this.createAutorisationForm.reset();
  this.showCreateAutorisationModal = true;
}

  closeCreateAutorisationModal() {
    this.showCreateAutorisationModal = false;
  }

  createAutorisation() {
  const formValue = this.createAutorisationForm.value;
  // Find the full employee object by email
  const employeeObj = this.employees.find(e => e.email === formValue.employee);
  if (!employeeObj) {
    console.error('Employee not found');
    return;
  }
  // Prepare the object to send (send only the ID if backend expects it)
  const autorisationToSend = {
    ...formValue,
    employee: employeeObj.id
  };
  this._autorisationService.createAutorisation(autorisationToSend).subscribe({
    next: (data) => {
      // For display, attach the full employee object
      this.autorisations.push({ ...data, employee: employeeObj });
      this.closeCreateAutorisationModal();
    },
    error: (error) => {
      console.error('Error creating autorisation:', error);
    }
  });
}
}