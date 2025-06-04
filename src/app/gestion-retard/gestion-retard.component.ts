import { Component } from '@angular/core';
import { Retard } from '../models/retard';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-gestion-retard',
  templateUrl: './gestion-retard.component.html',
  styleUrl: './gestion-retard.component.css'
})
export class GestionRetardComponent {
  retards: Retard[] = [];
  employees: Employee[] = [];

  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;

  newRetard: any = { dateDebut: '', dateFin: '', nbJours: 0, raison: '' };
  selectedRetard: Retard | null = null;
  selectedRetardIndex: number | null = null;

  openCreateModal() {
    this.newRetard = { dateDebut: '', dateFin: '', nbJours: 0, raison: '' };
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createRetard() {
    this.retards.push({ ...this.newRetard });
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
      this.retards[this.selectedRetardIndex] = { ...this.selectedRetard };
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
      this.retards.splice(this.selectedRetardIndex, 1);
    }
    this.closeDeleteModal();
  }
}
