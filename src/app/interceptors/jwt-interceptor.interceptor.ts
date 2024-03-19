import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
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
    private SettingsSerivce: SettingsService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
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
        const errorMessage =
          this.EnviromentService.getErrorCodeHttp()[error.status] ||
          'Error: ' + error.message;
        if (error.status === 401 || error.status === 403) {
          this.SettingsSerivce.getInfoCompany.subscribe((settings:any) =>{
            this.LoginService.logout('/login' , settings?.settings?.data?.companies?.id).then((data: any) => {
              this.ToastService.showToastNew(
                'ERROR',
                +error?.error?.message
                  ? 'Error: ' + error?.error?.message
                  : 'Error: ' + errorMessage,
                'error'
              );
            });
          })
        } else {
          this.ToastService.showToastNew(
            'ERROR',
            error?.error?.message
              ? 'Error: ' + error?.error?.message
              : 'Error: ' + errorMessage,
            'error'
          );
        }
        return throwError(() => error.error.message);
      })
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
