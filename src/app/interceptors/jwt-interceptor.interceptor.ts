import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { LoginService } from '../pages/public/login/services/login.service';
import { EnviromentService } from '../services/enviroment.service';
import { SettingsService } from '../pages/in/settings/services/settings.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private ToastService: ToastService,
    private LoginService: LoginService,
    private EnviromentService: EnviromentService,
    private SettingsSerivce: SettingsService,
  ) {}
  logoutExecuted: Boolean = false;
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // cacheo de estado
          if (
            event &&
            event.body &&
            typeof event.body.status != 'undefined' &&
            event.body.status != true
          ) {
            throw new Error(event.body.message);
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (
          (error.status === 401 || error.status === 403) &&
          !this.logoutExecuted
        ) {
          // Marcar como ejecutado inmediatamente para bloquear llamadas concurrentes
          this.logoutExecuted = true;
          const settings = JSON.parse(
            this.SettingsSerivce.getCompanyData() || 'null',
          );
          const companyId = settings?.data?.companies?.id;
          const loginPath = companyId ? '/login/' + companyId : '/login';
          const errorMessage =
            this.EnviromentService.getErrorCodeHttp()[error.status] ||
            'Sesión expirada, ingrese nuevamente';
          this.LoginService.logout(loginPath, companyId).then(() => {
            this.ToastService.showToastNew('ERROR', errorMessage, 'error');
          });
        } else if (error.status !== 401 && error.status !== 403) {
          // Solo mostrar toast para errores que NO sean de autenticación
          this.ToastService.showToastNew(
            'ERROR',
            error?.error?.message || 'Error, intente nuevamente más tarde',
            'error',
          );
        }
        return throwError(() => error?.error?.message);
      }),
    );
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.LoginService.getDataUser()?.access_token;
    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      });
      return authReq;
    }
    return request;
  }
}
