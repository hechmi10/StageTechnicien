import { Component } from '@angular/core';

@Component({
  selector: 'app-gestion-absence',
  templateUrl: './gestion-absence.component.html',
  styleUrl: './gestion-absence.component.css'
})
export class GestionAbsenceComponent {
  absences: any[] = [];
  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;

  newAbsence: any = { employee: '', startDate: '', endDate: '', reason: '' };
  selectedAbsence: any = null;
  selectedAbsenceIndex: number | null = null;

  openCreateModal() {
    this.showCreateModal = true;
    this.newAbsence = { employee: '', startDate: '', endDate: '', reason: '' };
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createAbsence() {
    this.absences.push({ ...this.newAbsence });
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
      this.absences[this.selectedAbsenceIndex] = { ...this.selectedAbsence };
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
      this.absences.splice(this.selectedAbsenceIndex, 1);
    }
    this.closeDeleteModal();
  }
}
