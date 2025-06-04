import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PointageComponent } from './pointage/pointage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GestionRetardComponent } from './gestion-retard/gestion-retard.component';
import { GestionAutorisationComponent } from './gestion-autorisation/gestion-autorisation.component';
import { GestionCongeComponent } from './gestion-conge/gestion-conge.component';
import { GestionEvaluationComponent } from './gestion-evaluation/gestion-evaluation.component';
import { GestionAbsenceComponent } from './gestion-absence/gestion-absence.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PointageComponent,
    LoginComponent,
    RegisterComponent,
    GestionRetardComponent,
    GestionAutorisationComponent,
    GestionCongeComponent,
    GestionEvaluationComponent,
    GestionAbsenceComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
