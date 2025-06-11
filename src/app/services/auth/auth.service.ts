import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../services/login/login.service';
import { Role } from '../../models/role';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private token: string | null = null;
  private role: Role | null = null;
  private refreshToken: string | null = null; // Add refresh token support

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedToken = localStorage.getItem('token');
      const storedRefreshToken = localStorage.getItem('refreshToken');
      const storedRole = localStorage.getItem('role');
      if (storedToken) {
        this.token = storedToken;
        this.refreshToken = storedRefreshToken || null;
        this.role = storedRole ? Role[storedRole as keyof typeof Role] : null;
        console.log('Initialized from localStorage - Token:', storedToken, 'RefreshToken:', storedRefreshToken, 'Role:', storedRole);
      } else {
        console.log('No token in localStorage on init');
      }
    }
  }

  login(email: string, password: string): Observable<{ role?: Role; error?: string }> {
    return new Observable(observer => {
      this.loginService.login({ email, password }).pipe(
        catchError((err: HttpErrorResponse) => {
          console.error('Login error (network/server):', err);
          observer.error({ error: err.error?.message || 'Login failed' });
          return throwError(() => err);
        })
      ).subscribe({
        next: (response: any) => {
          console.log('Raw login response:', response);
          if (response && typeof response === 'object' && response.token) {
            this.token = response.token;
            this.refreshToken = response.refreshToken || null; // Assume refreshToken is optional
            this.role = response.role ? Role[response.role as keyof typeof Role] : null;
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('token', this.token ?? '');
              if (this.refreshToken) localStorage.setItem('refreshToken', this.refreshToken);
              if (this.role) localStorage.setItem('role', this.role);
            }
            console.log('Login success - Token set:', this.token, 'RefreshToken set:', this.refreshToken, 'Role set:', this.role);
            if (this.role !== null) {
              observer.next({ role: this.role });
            } else {
              observer.next({});
            }
          } else {
            console.error('Invalid login response format - no token:', response);
            observer.error({ error: 'Invalid response format from login service: token is required' });
          }
          observer.complete();
        },
        error: (err) => {
          console.error('Login error (network/server):', err);
          observer.error({ error: err.error?.message || 'Login failed' });
        }
      });
    });
  }

  refresh(): Observable<{ token: string; refreshToken?: string }> {
    if (!this.refreshToken) {
      console.error('No refresh token available');
      return throwError(() => new Error('No refresh token available'));
    }
    return this.http.post<{ token: string; refreshToken?: string }>('http://localhost:8080/api/auth/refresh', { refreshToken: this.refreshToken }).pipe(
      tap((response) => {
        this.token = response.token;
        this.refreshToken = response.refreshToken || this.refreshToken;
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', this.token);
          if (this.refreshToken) localStorage.setItem('refreshToken', this.refreshToken);
        }
        console.log('Token refreshed - New Token:', this.token, 'RefreshToken:', this.refreshToken);
      }),
      catchError((err) => {
        console.error('Refresh token failed:', err);
        this.logout();
        return throwError(() => err);
      })
    );
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
    this.refreshToken = null;
    this.role = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
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
      Authorization: `Bearer ${this.token || ''}` // Handle null token gracefully
    });
  }
}