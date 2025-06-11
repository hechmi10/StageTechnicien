import { Component, OnInit } from '@angular/core';
import { Retard } from '../models/retard';
import { Employee } from '../models/employee';
import { GestionRetardService } from '../services/retard/gestion-retard.service';
import { EmployeeService } from '../services/employee/employee.service';

@Component({
  selector: 'app-gestion-retard',
  templateUrl: './gestion-retard.component.html',
  styleUrl: './gestion-retard.component.css'
})
export class GestionRetardComponent implements OnInit {
  constructor(private _service: GestionRetardService,private _employee_service: EmployeeService) { }
  retards: Retard[] = [];
  employees: Employee[] = [];

  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;

  newRetard: any = {employee:'', dateDebut: '', dateFin: '', nbJours: 0, raison: '' };
  selectedRetard: Retard | null = null;

  ngOnInit() {
    this.getRetards();
    this.loadEmployees();
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
    this.newRetard = { dateDebut: '', dateFin: '', nbJours: 0, raison: '' };
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createRetard() {
    this._service.createRetard(this.newRetard).subscribe({
      next: (data) => {
        console.log('Retard created successfully:', data);
        this.retards.push({ ...this.newRetard });
      },
      error: (error) => {
        console.error('Error creating retard:', error);
      }
    });
    this.closeCreateModal();
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
          this.retards[this.selectedRetardIndex!] = { ...this.selectedRetard };
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
}
