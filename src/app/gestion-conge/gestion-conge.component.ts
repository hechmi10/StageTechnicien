import { Component, OnInit } from '@angular/core';
import { Conge } from '../models/conge';
import { Employee } from '../models/employee';
import { GestionCongeService } from '../services/conge/gestion-conge.service';
import { EmployeeService } from '../services/employee/employee.service';

@Component({
  selector: 'app-gestion-conge',
  templateUrl: './gestion-conge.component.html',
  styleUrl: './gestion-conge.component.css'
})
export class GestionCongeComponent implements OnInit {
  constructor(private _conge_service: GestionCongeService, private _employee_service: EmployeeService) { }
  conges: Conge[] = [
  ];

  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;

  newConge: any = { employe: '', dateDebut: '', dateFin: '', type: '' };
  selectedConge: any = null;

  ngOnInit() {
    this.loadConges();
  }

  loadConges() {
    this._conge_service.getConge().subscribe({
      next: (data) => {
        this.conges = data;
      },
      error: (error) => {
        console.error('Error loading conges:', error);
      }
    });
  }
  employees: Employee[] = [];

  openCreateModal() {
    this.newConge = { employe: '', dateDebut: '', dateFin: '', type: '' };
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createConge() {
    this._conge_service.createConge(this.newConge).subscribe({
      next: (data) => {
        this.conges.push(data);
      },
      error: (error) => {
        console.error('Error creating conge:', error);
      }
    });
    this.closeCreateModal();
  }

  openUpdateModal(conge: any) {
    this.selectedConge = { ...conge };
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    this.selectedConge = null;
  }

  updateConge() {
    const index = this.conges.findIndex(c =>
      c.employee === this.selectedConge.employe &&
      c.dateDebut === this.selectedConge.dateDebut &&
      c.dateFin === this.selectedConge.dateFin &&
      c.raison === this.selectedConge.raison
    );
    if (index !== -1) {
      this._conge_service.updateConge(index,this.selectedConge).subscribe({
        next: (data) => {
          this.conges[index] = { ...data };
        },
        error: (error) => {
          console.error('Error updating conge:', error);
        }
      });
    }
    this.closeUpdateModal();
  }

  openDeleteModal(conge: any) {
    this.selectedConge = conge;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedConge = null;
  }

  deleteConge() {
    this._conge_service.deleteConge(this.selectedConge.id).subscribe({
      next: () => {
        this.conges = this.conges.filter(c => c !== this.selectedConge);
      },
      error: (error) => {
        console.error('Error deleting conge:', error);
      }
    });
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
