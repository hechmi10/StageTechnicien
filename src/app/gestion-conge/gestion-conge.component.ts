import { Component } from '@angular/core';
import { Conge } from '../models/conge';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-gestion-conge',
  templateUrl: './gestion-conge.component.html',
  styleUrl: './gestion-conge.component.css'
})
export class GestionCongeComponent {
  conges: Conge[] = [
  ];

  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;

  newConge: any = { employe: '', dateDebut: '', dateFin: '', type: '' };
  selectedConge: any = null;
  employees: Employee[] = [];

  openCreateModal() {
    this.newConge = { employe: '', dateDebut: '', dateFin: '', type: '' };
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createConge() {
    this.conges.push({ ...this.newConge });
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
      this.conges[index] = { ...this.selectedConge };
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
    this.conges = this.conges.filter(c => c !== this.selectedConge);
    this.closeDeleteModal();
  }
}
