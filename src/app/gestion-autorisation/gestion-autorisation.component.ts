import { Component, OnInit } from '@angular/core';
import { Autorisation } from '../models/autorisation';
import { Employee } from '../models/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionAutorisationService } from '../services/autorisation/gestion-autorisation.service';
import { EmployeeService } from '../services/employee/employee.service';

@Component({
  selector: 'app-gestion-autorisation',
  templateUrl: './gestion-autorisation.component.html',
  styleUrls: ['./gestion-autorisation.component.css']
})
export class GestionAutorisationComponent implements OnInit {
  
  constructor(private _autorisation_service: GestionAutorisationService, private _employee_service: EmployeeService) { }
  autorisations: Autorisation[] = [];
  employees: Employee[] = [];
  loading: boolean = true;

  showCreateModal = false;
  showEditModal = false;
  showDeleteModal = false;

  newAutorisation: Autorisation = { dateAutorisation: undefined, duration: '', employee: undefined };
  selectedAutorisation: Autorisation | null = null;
  autorisationToDelete: Autorisation | null = null;
  
  ngOnInit(): void {
    this.loadAutorisations();
    this.loadEmployees();
  }

  private loadAutorisations(): void {
    this.loading = true;
    this._autorisation_service.getAutorisation().subscribe({
      next: (data: Autorisation[]) => {
        this.autorisations = data;
        console.log('Autorisations loaded:', this.autorisations); // Debug log
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading autorisations:', error);
        this.loading = false;
      }
    });
  }

  private loadEmployees(): void {
    this._employee_service.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        console.log('Employees loaded:', this.employees); // Debug log
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
        this.loading = false;
      }
    });
  }

  form = new FormGroup({
    employee: new FormControl<string | null>(null, [Validators.required]),
    dateAutorisation: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required])
  });

  openCreateModal() {
    this.newAutorisation = { dateAutorisation: undefined, duration: '', employee: undefined };
    this.selectedAutorisation = null;
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createAutorisation() {
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    const formValue = this.form.value;
    const employeeId = formValue.employee;
    const employeeObj = this.employees.find(e => e.id === employeeId);
    if (!employeeObj) {
      console.error('Employee not found for ID:', employeeId);
      return;
    }
    const autorisation: Autorisation = {
      dateAutorisation: new Date(formValue.dateAutorisation!),
      duration: formValue.duration!,
      employee: employeeObj
    };
    this._autorisation_service.createAutorisation(autorisation).subscribe({
      next: (data) => {
        this.autorisations.push(data);
        this.form.reset({ employee: null, dateAutorisation: '', duration: '' });
      },
      error: (error) => {
        console.error('Error creating autorisation:', error);
      }
    });
    this.closeCreateModal();
  }

  openEditModal(autorisation: Autorisation) {
    this.selectedAutorisation = { ...autorisation };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  updateAutorisation() {
    if (!this.selectedAutorisation) return;
    const idx = this.autorisations.findIndex(a => a.id === this.selectedAutorisation?.id);
    if (idx > -1) {
      this._autorisation_service.updateAutorisation(idx, this.selectedAutorisation).subscribe({
        next: (data) => {
          this.autorisations[idx] = data;
        },
        error: (error) => {
          console.error('Error updating autorisation:', error);
        }
      });
    }
    this.closeEditModal();
  }

  openDeleteModal(autorisation: Autorisation) {
    this.autorisationToDelete = autorisation;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  deleteAutorisation() {
    if (!this.autorisationToDelete || this.autorisationToDelete.id === undefined) return;
    this._autorisation_service.deleteAutorisation(this.autorisationToDelete.id).subscribe({
      next: () => {
        this.autorisations = this.autorisations.filter(a => a.id !== this.autorisationToDelete!.id);
      },
      error: (error) => {
        console.error('Error deleting autorisation:', error);
      }
    });
    this.closeDeleteModal();
  }
}