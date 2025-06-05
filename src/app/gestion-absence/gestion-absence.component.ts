import { Component, OnInit } from '@angular/core';
import { Absence } from '../models/absence';
import { Employee } from '../models/employee';
import { GestionAbsenceService } from '../services/absence/gestion-absence.service';
import { EmployeeService } from '../services/employee/employee.service';

@Component({
  selector: 'app-gestion-absence',
  templateUrl: './gestion-absence.component.html',
  styleUrl: './gestion-absence.component.css'
})
export class GestionAbsenceComponent implements OnInit{
  constructor(private _absence_service: GestionAbsenceService, private _employee_service: EmployeeService) { }
  employees: Employee[] = [];
  absences: Absence[] = [];
  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;

  newAbsence: any = { employee: null, startDate: '', endDate: '', raison: '' };
  selectedAbsence: any = null;
  selectedAbsenceIndex: number | null = null;


  ngOnInit() {
    this.loadAbsences();
    this.loadEmployees();
  }

  loadAbsences() {
    this._absence_service.getAbsences().subscribe({
      next: (data) => {
        this.absences = data;
      },
      error: (error) => {
        console.error('Error loading absences:', error);
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

  openCreateModal() {
    this.showCreateModal = true;
    this.newAbsence = { employee: null, startDate: '', endDate: '', raison: '' };
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createAbsence() {
    this._absence_service.createAbsence(this.newAbsence).subscribe({
      next: (data) => {
        this.absences.push(data);
      },
      error: (error) => {
        console.error('Error creating absence:', error);
      }
    });
    this.closeCreateModal();
  }

  openUpdateModal(absence: any) {
    this.showUpdateModal = true;
    this.selectedAbsence = { ...absence };
    this.selectedAbsenceIndex = this.absences.indexOf(absence);
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    this.selectedAbsence = null;
    this.selectedAbsenceIndex = null;
  }

  updateAbsence() {
    if (this.selectedAbsenceIndex !== null) {
      this._absence_service.updateAbsence(this.selectedAbsenceIndex,this.selectedAbsence).subscribe({
        next: (data) => {
          this.absences[this.selectedAbsenceIndex!] = data;
        },
        error: (error) => {
          console.error('Error updating absence:', error);
        }
      });
    }
    this.closeUpdateModal();
  }

  openDeleteModal(absence: any) {
    this.showDeleteModal = true;
    this.selectedAbsence = absence;
    this.selectedAbsenceIndex = this.absences.indexOf(absence);
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedAbsence = null;
    this.selectedAbsenceIndex = null;
  }

  deleteAbsence() {
    if (this.selectedAbsenceIndex !== null) {
      this._absence_service.deleteAbsence(this.selectedAbsenceIndex).subscribe({
        next: () => {
          this.absences = this.absences.filter((_, index) => index !== this.selectedAbsenceIndex);
        },
        error: (error) => {
          console.error('Error deleting absence:', error);
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
}
