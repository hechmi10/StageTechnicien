import { Component, OnInit } from '@angular/core';
import { Retard } from '../models/retard';
import { Employee } from '../models/employee';
import { GestionRetardService } from '../services/retard/gestion-retard.service';
import { EmployeeService } from '../services/employee/employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-retard',
  templateUrl: './gestion-retard.component.html',
  styleUrls: ['./gestion-retard.component.css']
})
export class GestionRetardComponent implements OnInit {
  createRetardForm = new FormGroup({
    employee: new FormControl('', [Validators.required]),
    dateDebut: new FormControl('', [Validators.required]),
    dateFin: new FormControl('', [Validators.required]),
    nbJours: new FormControl(0, [Validators.required]),
    raison: new FormControl('', [Validators.required])
  });
  updateRetardForm = new FormGroup({
    employee: new FormControl('', [Validators.required]),
    dateDebut: new FormControl('', [Validators.required]),
    dateFin: new FormControl('', [Validators.required]),
    nbJours: new FormControl(0, [Validators.required]),
    raison: new FormControl('', [Validators.required])
  });
  constructor(private _service: GestionRetardService, private _employee_service: EmployeeService) { }
  retards: Retard[] = [];
  employees: Employee[] = [];

  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;

  newRetard: any = { employee: '', dateDebut: '', dateFin: '', nbJours: 0, raison: '' };
  selectedRetard: Retard | null = null;

  ngOnInit() {
    this.getRetards();
    this.loadEmployees();
    this.createRetardForm.get('dateDebut')?.valueChanges.subscribe(() => {
      this.updateNbJours();
    });
    this.createRetardForm.get('dateFin')?.valueChanges.subscribe(() => {
      this.updateNbJours();
    });
  }

  updateNbJours() {
  const dateDebut = this.createRetardForm.get('dateDebut')?.value ?? '';
  const dateFin = this.createRetardForm.get('dateFin')?.value ?? '';
  const nbJours = this.dateDiff(dateDebut, dateFin);
  this.createRetardForm.get('nbJours')?.setValue(nbJours, { emitEvent: false });
}

  getRetards() {
    this._service.getRetard().subscribe({
      next: (data) => {
        this.retards = data;
      },
      error: (error) => {
        console.error('Error fetching retards:', error);
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

  selectedRetardIndex: number | null = null;

  openCreateModal() {
    this.newRetard = { employee: '', dateDebut: '', dateFin: '', nbJours: 0, raison: '' };
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createRetard() {
    const formValue = this.createRetardForm.value;
    const selectedEmployee = this.employees.find(emp => emp.email === formValue.employee);
    if (!selectedEmployee) {
      console.error('Employee not found');
      return;
    }
    const retardToSend = {
      ...formValue,
      employee: selectedEmployee, // send the full Employee object
      dateDebut: formValue.dateDebut ? new Date(formValue.dateDebut) : new Date(),
      dateFin: formValue.dateFin ? new Date(formValue.dateFin) : new Date()
    };
    this._service.createRetard(retardToSend as Retard).subscribe({
      next: (data) => {
        console.log('Retard created successfully:', data);
        this.retards.push(data);
        this.closeCreateModal();
      },
      error: (error) => {
        console.error('Error creating retard:', error);
      }
    });
  }

  openUpdateModal(retard: Retard) {
    this.selectedRetardIndex = this.retards.indexOf(retard);
    this.selectedRetard = { ...retard };
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    this.selectedRetard = null;
    this.selectedRetardIndex = null;
  }

  updateRetard() {
    if (
      this.selectedRetard &&
      this.selectedRetardIndex !== null &&
      this.selectedRetardIndex > -1
    ) {
      this._service.updateRetard(this.selectedRetardIndex, this.selectedRetard).subscribe({
        next: (data) => {
          console.log('Retard updated successfully:', data);
          this.retards[this.selectedRetardIndex!] = { ...this.selectedRetard } as Retard;
        },
        error: (error) => {
          console.error('Error updating retard:', error);
        }
      });
    }
    this.closeUpdateModal();
  }

  openDeleteModal(retard: Retard) {
    this.selectedRetardIndex = this.retards.indexOf(retard);
    this.selectedRetard = { ...retard };
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedRetard = null;
    this.selectedRetardIndex = null;
  }

  deleteRetard() {
    if (
      this.selectedRetardIndex !== null &&
      this.selectedRetardIndex > -1
    ) {
      this._service.deleteRetard(this.selectedRetardIndex).subscribe({
        next: (data) => {
          console.log('Retard deleted successfully:', data);
          this.retards.splice(this.selectedRetardIndex!, 1);
        },
        error: (error) => {
          console.error('Error deleting retard:', error);
        }
      });
    }
    this.closeDeleteModal();
  }
  dateDiff(dateDebut: string | Date, dateFin: string | Date): number {
    if (!dateDebut || !dateFin) return 0;
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);
    const diffTime = fin.getTime() - debut.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  }
  retardToHeures(minutesRetard: number): number {
    if (minutesRetard > 120) return 8; // Absent = journée entière (exemple: 8h)
    if (minutesRetard > 60) return 3;
    if (minutesRetard > 30) return 2;
    if (minutesRetard > 15) return 1;
    return 0;
  }
  minutesRetard = ((this.createRetardForm.value.nbJours ?? 0) * 3600) / 60; // récupéré du formulaire
  heuresRetard = this.retardToHeures(this.minutesRetard ?? 0);
}
