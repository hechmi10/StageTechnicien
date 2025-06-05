import { Component } from '@angular/core';

@Component({
  selector: 'app-pointage',
  templateUrl: './pointage.component.html',
  styleUrl: './pointage.component.css'
})
export class PointageComponent {
  nombrePointagesRestants: number = 2;
  pointage() {
    if (this.nombrePointagesRestants > 0) {
      this.nombrePointagesRestants--;
      console.log('Pointage effectué. Points restants:', this.nombrePointagesRestants);
    } else {
      console.log('Aucun pointage restant.');
    }
  }
}
