import { Component, OnInit } from '@angular/core';
import { Autorisation } from '../models/autorisation';
import { Employee } from '../models/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GestionAutorisationService } from '../services/autorisation/gestion-autorisation.service';
import { EmployeeService } from '../services/employee/employee.service';

@Component({
  selector: 'app-gestion-autorisation',
  templateUrl: './gestion-autorisation.component.html',
  styleUrl: './gestion-autorisation.component.css'
})
export class GestionAutorisationComponent implements OnInit {
  
  constructor(private _autorisation_service: GestionAutorisationService, private _employee_service: EmployeeService) { }
  autorisations: Autorisation[] = [];

  employees:Employee[] = [];

  showCreateModal = false;
  showEditModal = false;
  showDeleteModal = false;

  newAutorisation = { dateAutorisation: '', duration: '', employee: undefined };
  selectedAutorisation: any = null;
  autorisationToDelete: any = null;
  
  ngOnInit(): void {
    this._autorisation_service.getAutorisation().subscribe((data: Autorisation[]) => {
      this.autorisations = data;
    });

    this._employee_service.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  form=new FormGroup({
    dateAutorisation: new FormControl(new Date(),[Validators.required]),
    duration: new FormControl('',[Validators.required]),
    employee: new FormControl('',[Validators.required])
  });

  openCreateModal() {
    this.newAutorisation = { dateAutorisation: '', duration: '', employee: undefined };
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
    const employeeObj = this.employees.find(e => e.id === formValue.employee);
    const autorisation: Autorisation = {
      date: formValue.dateAutorisation!,
      duration: formValue.duration!,
      employee: employeeObj
    };
    this._autorisation_service.createAutorisation(autorisation).subscribe({
      next: (data) => {
        this.autorisations.push(data);
      },
      error: (error) => {
        console.error('Error creating autorisation:', error);
      }
    });
    this.closeCreateModal();
  }

  openEditModal(autorisation: any) {
    this.selectedAutorisation = { ...autorisation };
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  updateAutorisation() {
    const idx = this.autorisations.findIndex(a => a.id === this.selectedAutorisation.id);
    if (idx > -1) {
      this._autorisation_service.updateAutorisation(idx,this.selectedAutorisation).subscribe({
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

  openDeleteModal(autorisation: any) {
    this.autorisationToDelete = autorisation;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  deleteAutorisation() {
    this._autorisation_service.deleteAutorisation(this.autorisationToDelete.id).subscribe({
      next: () => {
        this.autorisations = this.autorisations.filter(a => a.id !== this.autorisationToDelete.id);
      },
      error: (error) => {
        console.error('Error deleting autorisation:', error);
      }
    });
    this.closeDeleteModal();
  }
}
