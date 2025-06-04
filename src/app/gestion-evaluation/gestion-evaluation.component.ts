import { Component } from '@angular/core';
import { Evaluation } from '../models/evaluation';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-gestion-evaluation',
  templateUrl: './gestion-evaluation.component.html',
  styleUrl: './gestion-evaluation.component.css'
})
export class GestionEvaluationComponent {
  evaluations: Evaluation[] = [
  ];

  showCreateModal = false;
  showUpdateModal = false;
  showDeleteModal = false;

  newEval: Evaluation = { date:new Date() };
  selectedEval: Evaluation | null = null;
  employees: Employee[] = [];

  openCreateModal() {
    this.newEval = { date: new Date() };
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  createEvaluation() {
    this.evaluations.push({
      date: this.newEval.date,
    });
    this.closeCreateModal();
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
    const idx = this.evaluations.findIndex(e => e.date === this.selectedEval!.date );
    if (idx !== -1) {
      this.evaluations[idx] = { ...this.selectedEval };
    } else {
      // fallback: update by index if title/date/score changed
      const origIdx = this.evaluations.findIndex(e => e.date === this.selectedEval!.date);
      if (origIdx !== -1) {
        this.evaluations[origIdx] = { ...this.selectedEval };
      }
    }
    this.closeUpdateModal();
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
