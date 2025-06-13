import { Component, OnInit } from '@angular/core';
import { GestionRetardService } from '../services/retard/gestion-retard.service';
import { GestionAbsenceService } from '../services/absence/gestion-absence.service';
import { GestionAutorisationService } from '../services/autorisation/gestion-autorisation.service';
import { GestionCongeService } from '../services/conge/gestion-conge.service';
import { Autorisation } from '../models/autorisation';
import { Retard } from '../models/retard';
import { Absence } from '../models/absence';
import { Conge } from '../models/conge';

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrl: './pointage.component.css'
})
export class PointageComponent implements OnInit {
  constructor(
    private _retardService: GestionRetardService,
    private _absenceService: GestionAbsenceService,
    private _autorisationService: GestionAutorisationService,
    private _congeService: GestionCongeService
  ) { }
  autorisations: Autorisation[] = [];
  retards: Retard[] = [];
  absences: Absence[] = [];
  conges: Conge[] = [];
   heuresAbsence: number = 0;
  heuresRetard: number = 0;
  heuresAutorisation: number = 0;
  totalSanction: number = 0;
  ngOnInit(): void {
    this._autorisationService.getAutorisation().subscribe(data => {
      this.autorisations = data;
      this.heuresAutorisation = this.autorisations.reduce((sum, a) => sum + Number(a.duration || 0), 0);
      this.updateTotalSanction();
    });
    this._retardService.getRetard().subscribe(data => {
      this.retards = data;
      this.heuresRetard = this.retards.reduce((sum, r) => sum + (r.nbJours || 0), 0);
      this.updateTotalSanction();
    });
    this._absenceService.getAbsences().subscribe(data => {
      this.absences = data;
      this.heuresAbsence = this.absences.reduce((sum, ab) => sum + (ab.nbJours || 0), 0);
      this.updateTotalSanction();
    });
    this._congeService.getConge().subscribe(data => {
      this.conges = data;
    });
  }
  nombrePointagesRestants: number = 2;
  pointage() {
    if (this.nombrePointagesRestants > 0) {
      this.nombrePointagesRestants--;
      console.log('Pointage effectué. Points restants:', this.nombrePointagesRestants);
    } else {
      console.log('Aucun pointage restant.');
    }
  }
  countNumberOfRetards(): number {
    // Logique pour compter le nombre de retards
    // Pour l'instant, retournons un nombre fixe pour l'exemple
    return this.retards.length; // Remplacez ceci par la logique réelle
  }
  countNumberOfAbsences(): number {
    // Logique pour compter le nombre d'absences
    // Pour l'instant, retournons un nombre fixe pour l'exemple
    return this.absences.length; // Remplacez ceci par la logique réelle
  }
  countNumberOfAutorisations(): number {
    // Logique pour compter le nombre d'autorisations
    // Pour l'instant, retournons un nombre fixe pour l'exemple
    return this.autorisations.length; // Remplacez ceci par la logique réelle
  }
  countNumberOfConges(): number {
    // Logique pour compter le nombre de congés
    // Pour l'instant, retournons un nombre fixe pour l'exemple
    return this.conges.length; // Remplacez ceci par la logique réelle
  }
  calculSanction(
    heuresAbsence: number,
    heuresRetard: number,
    heuresAutorisation: number
  ): number {
    return heuresAbsence + heuresRetard + heuresAutorisation;
  }
  updateTotalSanction() {
    this.totalSanction = this.calculSanction(this.heuresAbsence, this.heuresRetard, this.heuresAutorisation);
  }
}
