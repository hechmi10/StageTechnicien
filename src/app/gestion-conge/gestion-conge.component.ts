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

  
  showUpdateModal = false;
  showDeleteModal = false;

  selectedConge: any = null;

  updateCongeForm: FormGroup = new FormGroup({
    employe: new FormControl('', Validators.required),
    dateDebut: new FormControl('', Validators.required),
    dateFin: new FormControl('', Validators.required),
    nbJours: new FormControl(0, Validators.required),
    raison: new FormControl('', Validators.required)
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
      this._conge_service.updateConge(index, this.selectedConge).subscribe({
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
  soldeConge(moisTravailles: number): number {
    return moisTravailles * 1.75;
  }
  resteSoldeConge(
    soldeConge: number,
    ancienSolde: number,
    sanctions: number
  ): number {
    return soldeConge + ancienSolde - sanctions;
  }
}
