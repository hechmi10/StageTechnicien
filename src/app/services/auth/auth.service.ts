import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../models/employee';
import { Admin } from '../../models/admin';
import { LoginService } from '../../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Employee | Admin | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private loginService: LoginService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('Loaded user from localStorage:', user);
        this.currentUserSubject.next(user);
      } else {
        console.log('No user in localStorage');
      }
    }
  }

  loginEmployee(email: string, password: string): Observable<Employee> {
    return new Observable(observer => {
      this.loginService.login({ email, password }).subscribe({
        next: (employee) => {
          console.log('Employee logged in:', employee);
          this.currentUserSubject.next(employee);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('currentUser', JSON.stringify(employee));
          }
          observer.next(employee);
          observer.complete();
        },
        error: (err) => {
          console.error('Employee login error:', err);
          observer.error(err);
        }
      });
    });
  }

  loginAdmin(email: string, password: string): Observable<Admin> {
    return new Observable(observer => {
      this.loginService.loginAdmin({ email, password }).subscribe({
        next: (admin) => {
          console.log('Admin logged in:', admin);
          this.currentUserSubject.next(admin);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('currentUser', JSON.stringify(admin));
          }
          observer.next(admin);
          observer.complete();
        },
        error: (err) => {
          console.error('Admin login error:', err);
          observer.error(err);
        }
      });
    });
  }

  logout(): void {
    console.log('Logging out');
    this.currentUserSubject.next(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }

  getCurrentUser(): Employee | Admin | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const isAuth = !!this.currentUserSubject.value;
    console.log('isAuthenticated:', isAuth);
    return isAuth;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    const isAdmin = user?.role === 'ADMIN';
    console.log('isAdmin:', isAdmin, 'User role:', user?.role);
    return isAdmin;
  }
}