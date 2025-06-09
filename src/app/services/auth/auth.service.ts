import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../../models/employee';
import { Admin } from '../../models/admin';
import { LoginService } from '../../services/login/login.service';
import { Role } from '../../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Employee | Admin | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private token: string | null = null;

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        try {
          const user = JSON.parse(storedUser);
          this.currentUserSubject.next(user);
          this.token = storedToken;
          console.log('Initialized from localStorage - User:', user, 'Token:', storedToken);
        } catch (e) {
          console.error('Error parsing stored user data:', e);
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          console.log('Cleared invalid data from localStorage');
        }
      } else {
        console.log('No user or token in localStorage on init');
      }
    }
  }

  login(email: string, password: string): Observable<Employee | Admin> {
    return new Observable(observer => {
      this.loginService.login({ email, password }).subscribe({
        next: (response: any) => {
          console.log('Raw login response:', response);
          if (response && typeof response === 'object') {
            if (response.token && response.user) {
              this.currentUserSubject.next(response.user);
              this.token = response.token;
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('currentUser', JSON.stringify(response.user));
                localStorage.setItem('token', response.token);
              }
              console.log('Login success - User set:', response.user, 'Token set:', response.token);
              observer.next(response.user);
            } else if (response.token) {
              console.warn('User data missing, using minimal user object:', response);
              const minimalUser = { id: 0, email, role: Role.EMPLOYEE };
              this.currentUserSubject.next(minimalUser);
              this.token = response.token;
              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('currentUser', JSON.stringify(minimalUser));
                localStorage.setItem('token', response.token);
              }
              console.log('Fallback user set:', minimalUser, 'Token:', response.token);
              observer.next(minimalUser);
            } else {
              console.error('Invalid login response format - no token or user:', response);
              observer.error(new Error('Invalid response format from login service: missing token or user'));
            }
          } else {
            console.error('Invalid login response type:', response);
            observer.error(new Error('Invalid response format from login service: unexpected type'));
          }
          observer.complete();
        },
        error: (err) => {
          console.error('Login error (network/server):', err);
          observer.error(err);
        }
      });
    });
  }

  getToken(): string | null {
    console.log('getToken called, returning:', this.token);
    return this.token;
  }

  logout(): void {
    console.log('Logging out');
    this.currentUserSubject.next(null);
    this.token = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }
  }

  getCurrentUser(): Employee | Admin | null {
    const user = this.currentUserSubject.value;
    console.log('getCurrentUser called, returning:', user);
    return user;
  }

  isAuthenticated(): boolean {
    const isAuth = !!this.currentUserSubject.value && !!this.token;
    console.log('isAuthenticated called, returning:', isAuth, 'User:', this.currentUserSubject.value, 'Token:', this.token);
    return isAuth;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    const isAdmin = user?.role === Role.ADMIN;
    console.log('isAdmin called, returning:', isAdmin, 'User role:', user ? user.role : 'No user');
    return isAdmin;
  }

  getAuthHeaders(): HttpHeaders {
    console.log('getAuthHeaders called, token:', this.token);
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }
}