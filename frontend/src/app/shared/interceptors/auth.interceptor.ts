import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _router: Router, private _authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = this._authService.getToken();

    if (!authToken) {
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Redirecionar para a página de login
            this._router.navigate(['/auth']);
          } 
          return throwError(() => error);
        })
      );
    }

    const authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${authToken}`) });
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this._router.navigate(['/']);
        } 
        return throwError(() => error);
      })
    );
  }
}