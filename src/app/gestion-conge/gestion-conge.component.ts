import { Component, OnInit } from '@angular/core';
import { Conge } from '../models/conge';
import { Employee } from '../models/employee';
import { GestionCongeService } from '../services/conge/gestion-conge.service';
import { EmployeeService } from '../services/employee/employee.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  newConge: any = { employe: '', dateDebut: '', dateFin: '',nbJours:0, raison: '' };
  selectedConge: any = null;

  updateCongeForm: FormGroup = new FormGroup({
    employe:new FormControl ('', Validators.required),
      dateDebut: new FormControl ('', Validators.required),
      dateFin: new FormControl ('', Validators.required),
      nbJours: new FormControl (0, Validators.required),
      raison: new FormControl ('', Validators.required)
  });


  ngOnInit() {
    this.loadEmployees();
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
    this.newConge = { employe: '', dateDebut: '', dateFin: '', raison: '' };
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createConge() {
  // Find the employee object by email
  const selectedEmployee = this.employees.find(emp => emp.email === this.newConge.employe);
  if (!selectedEmployee) {
    alert('Veuillez sélectionner un employé valide.');
    return;
  }

  // Convert date strings to Date objects
  const dateDebut = this.newConge.dateDebut ? new Date(this.newConge.dateDebut) : undefined;
  const dateFin = this.newConge.dateFin ? new Date(this.newConge.dateFin) : undefined;

  // Calculate number of days
  const nbJours = (dateDebut && dateFin) ? this.dateDiff(dateDebut, dateFin) : 0;

  // Prepare the object to send
  const congeToSend = {
    ...this.newConge,
    employe: selectedEmployee,
    dateDebut,
    dateFin,
    nbJours
  };

  this._conge_service.createConge(congeToSend).subscribe({
    next: (data) => {
      this.conges.push(data);
      this.closeCreateModal();
    },
    error: (error) => {
      console.error('Error creating conge:', error);
    }
  });
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
        this.loadConges();
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
