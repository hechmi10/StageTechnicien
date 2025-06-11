import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken() || ''}`
      }
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);

          return this.authService.refresh().pipe(
            switchMap(() => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(this.authService.getToken());
              return next.handle(authReq.clone({ setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` } }));
            }),
            catchError((err) => {
              this.isRefreshing = false;
              this.authService.logout();
              return throwError(() => new Error('Session expired, please log in again'));
            })
          );
        } else if (error.status === 401 && this.isRefreshing) {
          return this.refreshTokenSubject.pipe(
            switchMap(() => next.handle(authReq.clone({ setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` } })))
          );
        }
        return throwError(() => error);
      })
    );
  }
}