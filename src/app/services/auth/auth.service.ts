import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../services/login/login.service';
import { Role } from '../../models/role'; // Import the Role enum

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private token: string | null = null;
  private role: Role | null = null; // Use Role enum type

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedToken = localStorage.getItem('token');
      const storedRole = localStorage.getItem('role'); // Load role as string
      if (storedToken) {
        this.token = storedToken;
        this.role = storedRole ? Role[storedRole as keyof typeof Role] : null; // Map string to enum
        console.log('Initialized from localStorage - Token:', storedToken, 'Role:', storedRole);
      } else {
        console.log('No token in localStorage on init');
      }
    }
  }

  login(email: string, password: string): Observable<{ role?: Role }> {
    return new Observable(observer => {
      this.loginService.login({ email, password }).subscribe({
        next: (response: any) => {
          console.log('Raw login response:', response);
          if (response && typeof response === 'object' && response.token) {
            this.token = response.token;
            this.role = response.role ? Role[response.role as keyof typeof Role] : null; // Map response role to enum
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('token', response.token);
              if (this.role) localStorage.setItem('role', this.role); // Store enum as string
            }
            console.log('Login success - Token set:', this.token, 'Role set:', this.role);
            if (this.role !== null) {
              observer.next({ role: this.role }); // Return role as enum
            } else {
              observer.next({}); // No role property if null
            }
          } else {
            console.error('Invalid login response format - no token:', response);
            observer.error(new Error('Invalid response format from login service: token is required'));
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

  getRole(): Role | null {
    console.log('getRole called, returning:', this.role);
    return this.role;
  }

  logout(): void {
    console.log('Logging out');
    this.currentUserSubject.next(null);
    this.token = null;
    this.role = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }

  getCurrentUser(): any {
    const user = this.currentUserSubject.value;
    console.log('getCurrentUser called, returning:', user);
    return user;
  }

  isAuthenticated(): boolean {
    const isAuth = !!this.token;
    console.log('isAuthenticated called, returning:', isAuth, 'Token:', this.token);
    return isAuth;
  }

  isAdmin(): boolean {
    console.log('isAdmin called, returning:', this.role === Role.ADMIN);
    return this.role === Role.ADMIN;
  }

  getAuthHeaders(): HttpHeaders {
    console.log('getAuthHeaders called, token:', this.token);
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }
}