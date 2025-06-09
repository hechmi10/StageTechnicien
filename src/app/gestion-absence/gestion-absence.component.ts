import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestionAbsenceService } from '../services/absence/gestion-absence.service';
import { EmployeeService } from '../services/employee/employee.service';
import { Employee } from '../models/employee';
import { Absence } from '../models/absence';

@Component({
  selector: 'app-gestion-absence',
  templateUrl: './gestion-absence.component.html',
  styleUrls: ['./gestion-absence.component.css']
})
export class GestionAbsenceComponent implements OnInit {
  absences: Absence[] = [];
  employees: Employee[] = [];
  createForm: FormGroup;
  updateForm: FormGroup;
  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;
  selectedAbsence: Absence | null = null;

  constructor(
    private absenceService: GestionAbsenceService,
    private employeeService: EmployeeService,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({
      employee: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      nbJours: [{ value: 0, disabled: true }, Validators.required],
      raison: ['', Validators.required]
    });

    this.updateForm = this.fb.group({
      employee: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      raison: ['', Validators.required]
    });

    // Update nbJours when startDate or endDate changes
    this.createForm.get('startDate')?.valueChanges.subscribe(() => this.updateNbJours());
    this.createForm.get('endDate')?.valueChanges.subscribe(() => this.updateNbJours());
  }

  ngOnInit(): void {
    this.loadAbsences();
    this.loadEmployees();
  }

  loadAbsences(): void {
    this.absenceService.getAbsences().subscribe({
      next: (absences) => {
        console.log('Absences loaded:', absences);
        this.absences = absences.filter(absence => absence.employee); // Filter out absences with null employee
      },
      error: (err) => console.error('Error loading absences:', err)
    });
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        console.log('Employees loaded:', employees);
        this.employees = employees;
      },
      error: (err) => console.error('Error loading employees:', err)
    });
  }

  updateNbJours(): void {
    const startDate = this.createForm.get('startDate')?.value;
    const endDate = this.createForm.get('endDate')?.value;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      this.createForm.get('nbJours')?.setValue(diffDays);
    }
  }

  openCreateModal(): void {
    this.showCreateModal = true;
    this.createForm.reset();
  }

  closeCreateModal(): void {
    this.showCreateModal = false;
    this.createForm.reset();
  }

  createAbsence(): void {
    if (this.createForm.valid) {
      const absence: Absence = {
        ...this.createForm.getRawValue(),
        dateDebut: this.createForm.get('startDate')?.value,
        dateFin: this.createForm.get('endDate')?.value
      };
      this.absenceService.createAbsence(absence).subscribe({
        next: () => {
          console.log('Absence created');
          this.loadAbsences();
          this.closeCreateModal();
        },
        error: (err) => console.error('Error creating absence:', err)
      });
    }
  }

  openUpdateModal(absence: Absence): void {
    if (!absence.employee) {
      console.warn('Cannot update absence with null employee:', absence);
      return;
    }
    this.selectedAbsence = { ...absence };
    this.updateForm.patchValue({
      employee: absence.employee,
      startDate: absence.dateDebut,
      endDate: absence.dateFin,
      raison: absence.raison
    });
    this.showUpdateModal = true;
  }

  closeUpdateModal(): void {
    this.showUpdateModal = false;
    this.updateForm.reset();
    this.selectedAbsence = null;
  }

  updateAbsence(): void {
    if (this.updateForm.valid && this.selectedAbsence) {
      const updatedAbsence: Absence = {
        ...this.selectedAbsence,
        ...this.updateForm.value,
        dateDebut: this.updateForm.get('startDate')?.value,
        dateFin: this.updateForm.get('endDate')?.value
      };
        if (updatedAbsence.id !== undefined) {
    this.absenceService.updateAbsence(updatedAbsence.id, updatedAbsence).subscribe({
      next: () => {
        console.log('Absence updated');
        this.loadAbsences();
        this.closeUpdateModal();
      },
      error: (err) => console.error('Error updating absence:', err)
    });
  } else {
    console.error('Cannot update absence: id is undefined', updatedAbsence);
  }
    }
  }

  openDeleteModal(absence: Absence): void {
    this.selectedAbsence = absence;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.selectedAbsence = null;
  }

  deleteAbsence(): void {
    if (this.selectedAbsence?.id) {
      this.absenceService.deleteAbsence(this.selectedAbsence.id).subscribe({
        next: () => {
          console.log('Absence deleted');
          this.loadAbsences();
          this.closeDeleteModal();
        },
        error: (err) => console.error('Error deleting absence:', err)
      });
    }
  }
}