import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionAbsenceComponent } from './gestion-absence/gestion-absence.component';
import { GestionAutorisationComponent } from './gestion-autorisation/gestion-autorisation.component';
import { GestionCongeComponent } from './gestion-conge/gestion-conge.component';
import { GestionEvaluationComponent } from './gestion-evaluation/gestion-evaluation.component';
import { GestionRetardComponent } from './gestion-retard/gestion-retard.component';
import { LoginComponent } from './login/login.component';
import { PointageComponent } from './pointage/pointage.component';
import { RegisterComponent } from './register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'pointage', component: PointageComponent},
  {path: 'gestion-retard', component: GestionRetardComponent},
  {path: 'gestion-autorisation', component: GestionAutorisationComponent},
  {path: 'gestion-conge', component: GestionCongeComponent},
  {path: 'gestion-evaluation', component: GestionEvaluationComponent},
  {path: 'gestion-absence', component: GestionAbsenceComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
