import { Component, OnInit } from '@angular/core';
import { Evaluation } from '../models/evaluation';
import { Employee } from '../models/employee';
import { GestionEvaluationService } from '../services/evaluation/gestion-evaluation.service';
import { EmployeeService } from '../services/employee/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-evaluation',
  templateUrl: './gestion-evaluation.component.html',
  styleUrl: './gestion-evaluation.component.css'
})
export class GestionEvaluationComponent implements OnInit {
  constructor(private _eval_service: GestionEvaluationService, private _employee_service: EmployeeService) { }
  createForm = new FormGroup({
    employee: new FormControl('', Validators.required),

    date: new FormControl('', Validators.required)
  });
  updateForm = new FormGroup({
    employee: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
    this._eval_service.getEvaluation().subscribe((data: Evaluation[]) => {
      this.evaluations = data;
    });

    this._employee_service.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }
  evaluations: Evaluation[] = [
  ];

  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;

  newEval = { date: new Date(), employee: null as Employee | null };
  selectedEval: Evaluation | null = null;
  employees: Employee[] = [];

  openCreateModal() {
    this.newEval = { date: new Date(), employee: null };
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createEvaluation() {
    const formValue = this.createForm.value;
    const selectedEmployee = this.employees.find(emp => emp.email === formValue.employee);
    if (!selectedEmployee) {
      console.error('Selected employee email not found');
      return;
    }
    this._eval_service.createEvaluation({
      date: formValue.date ? new Date(formValue.date) : new Date(),
      employee: selectedEmployee
    } as Evaluation).subscribe({
      next: (data) => {
        this.evaluations.push(data);
        this.closeCreateModal();
      },
      error: (error) => {
        console.error('Error creating evaluation:', error);
      }
    });
  }

  openUpdateModal(evalObj: any) {
    this.selectedEval = { ...evalObj };
    this.showUpdateModal = true;
  }

  closeUpdateModal() {
    this.showUpdateModal = false;
    this.selectedEval = null;
  }

  updateEvaluation() {
    const formValue = this.updateForm.value;
    const selectedEmployee = this.employees.find(emp => emp.email === formValue.employee);
    if (!selectedEmployee) {
      console.error('Selected employee email not found');
      return;
    }
    // Ensure selectedEval and its id are defined
    if (!this.selectedEval || this.selectedEval.id === undefined) {
      console.error('Selected evaluation or its id is undefined');
      return;
    }
    this._eval_service.updateEvaluation(this.selectedEval.id, {
      date: formValue.date ? new Date(formValue.date) : new Date(),
      employee: selectedEmployee
    } as Evaluation).subscribe({
      next: (data) => {
        const idx = this.evaluations.findIndex(e => e.id === this.selectedEval!.id);
        if (idx !== -1) this.evaluations[idx] = data;
        this.closeUpdateModal();
      },
      error: (error) => {
        console.error('Error updating evaluation:', error);
      }
    });
  }

  openDeleteModal(evalObj: any) {
    this.selectedEval = evalObj;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
    this.selectedEval = null;
  }

  deleteEvaluation() {
    this.evaluations = this.evaluations.filter(e => e !== this.selectedEval);
    this.closeDeleteModal();
  }
}
