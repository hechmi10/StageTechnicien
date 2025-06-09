import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../services/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null); // Removed specific Employee/Admin type
  currentUser$ = this.currentUserSubject.asObservable();
  private token: string | null = null;

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        this.token = storedToken;
        console.log('Initialized from localStorage - Token:', storedToken);
      } else {
        console.log('No token in localStorage on init');
      }
    }
  }

  login(email: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.loginService.login({ email, password }).subscribe({
        next: (response: any) => {
          console.log('Raw login response:', response);
          if (response && typeof response === 'object' && response.token) {
            this.token = response.token;
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('token', response.token);
            }
            console.log('Login success - Token set:', this.token);
            observer.next({}); // Emit an empty object since no user is available
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

  logout(): void {
    console.log('Logging out');
    this.currentUserSubject.next(null);
    this.token = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }

  getCurrentUser(): any {
    const user = this.currentUserSubject.value;
    console.log('getCurrentUser called, returning:', user);
    return user;
  }

  isAuthenticated(): boolean {
    const isAuth = !!this.token; // Simplified to check only token
    console.log('isAuthenticated called, returning:', isAuth, 'Token:', this.token);
    return isAuth;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    console.warn('isAdmin called but user data is unavailable, returning false');
    return false; // Default to false since no role data
  }

  getAuthHeaders(): HttpHeaders {
    console.log('getAuthHeaders called, token:', this.token);
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }
}