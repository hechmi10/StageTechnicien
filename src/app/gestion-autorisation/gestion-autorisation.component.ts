import { Component, OnInit } from '@angular/core';
import { Autorisation } from '../models/autorisation';
import { Employee } from '../models/employee';
import { GestionAutorisationService } from '../services/autorisation/gestion-autorisation.service';
import { EmployeeService } from '../services/employee/employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-autorisation',
  templateUrl: './gestion-autorisation.component.html',
  styleUrls: ['./gestion-autorisation.component.css']
})
export class GestionAutorisationComponent implements OnInit {
  autorisations: Autorisation[] = [];
  employees: Employee[] = [];

  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;

  newAutorisation: any = { employee: null, dateAutorisation: '', duration: '' };
  selectedAutorisation: any = null;

  createAutorisationForm: FormGroup = new FormGroup({
      employee: new FormControl(null, Validators.required),
      dateAutorisation: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required)
    });

  constructor(
    private _autorisation_service: GestionAutorisationService,
    private _employee_service: EmployeeService
  ) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadAutorisations();
  }

  // Data loading
  loadAutorisations() {
    this._autorisation_service.getAutorisation().subscribe({
      next: (data) => {
        this.autorisations = data;
      },
      error: (error) => {
        console.error('Error loading autorisations:', error);
      }
    });
  }

  loadEmployees() {
    this._employee_service.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

 

  // Update
  openUpdateModal(autorisation: any) {
    const employeeObj = this.employees.find(
      e =>
        e.email === autorisation.employee?.email ||
        e.id === autorisation.employee?.id
    );
    this.selectedAutorisation = { ...autorisation, employee: employeeObj || autorisation.employee };
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    this.selectedAutorisation = null;
  }

  updateAutorisation() {
    const employeeObj = this.employees.find(
      e =>
        e.email === this.selectedAutorisation.employee?.email ||
        e.id === this.selectedAutorisation.employee?.id ||
        e.email === this.selectedAutorisation.employee ||
        e.id === this.selectedAutorisation.employee
    );
    const autorisationToSend = {
      ...this.selectedAutorisation,
      employee: employeeObj || this.selectedAutorisation.employee
    };
    const index = this.autorisations.findIndex(a => a.id === this.selectedAutorisation?.id);
    if (index !== -1) {
      this._autorisation_service.updateAutorisation(this.selectedAutorisation.id, autorisationToSend).subscribe({
        next: (data) => {
          this.autorisations[index] = { ...data };
          this.closeUpdateModal();
        },
        error: (error) => {
          console.error('Error updating autorisation:', error);
        }
      });
    }
  }

  // Delete
  openDeleteModal(autorisation: any) {
    this.selectedAutorisation = autorisation;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedAutorisation = null;
  }

  deleteAutorisation() {
    this._autorisation_service.deleteAutorisation(this.selectedAutorisation.id).subscribe({
      next: () => {
        this.autorisations = this.autorisations.filter(a => a !== this.selectedAutorisation);
        this.closeDeleteModal();
      },
      error: (error) => {
        console.error('Error deleting autorisation:', error);
      }
    });
  }

  // Utility
  dateDiff(dateDebut: string | Date | null | undefined, dateFin: string | Date | null | undefined): number {
    if (!dateDebut || !dateFin) return 0;
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diffTime = fin.getTime() - debut.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  }
}
