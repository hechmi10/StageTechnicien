import { Component } from '@angular/core';
import { Autorisation } from '../models/autorisation';
import { Employee } from '../models/employee';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-autorisation',
  templateUrl: './gestion-autorisation.component.html',
  styleUrl: './gestion-autorisation.component.css'
})
export class GestionAutorisationComponent {
  autorisations: Autorisation[] = [];

  employees:Employee[] = [];

  showCreateModal = false;
  showEditModal = false;
  showDeleteModal = false;

  newAutorisation = { dateAutorisation: '', duration: '', employee: undefined };
  selectedAutorisation: any = null;
  autorisationToDelete: any = null;

  form=new FormGroup({
    dateAutorisation: new FormControl('',[Validators.required]),
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
    const ids = this.autorisations.map(a => a.id).filter((id): id is number => id !== undefined);
    const newId = ids.length ? Math.max(...ids) + 1 : 1;
    this.autorisations.push({
      id: newId,
      date: new Date(this.newAutorisation.dateAutorisation),
      duration: this.newAutorisation.duration,
      employee: this.newAutorisation.employee
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
      this.autorisations[idx] = {
        ...this.selectedAutorisation,
        dateAutorisation: new Date(this.selectedAutorisation.dateAutorisation)
      };
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
    this.autorisations = this.autorisations.filter(a => a.id !== this.autorisationToDelete.id);
    this.closeDeleteModal();
  }
}
