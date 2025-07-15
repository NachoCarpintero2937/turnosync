import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { HttpErrorCodes } from 'src/environments/environment';
import { ToastService } from '../services/toast.service';
import { LoginService } from '../pages/public/login/services/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private ToastService: ToastService,
    private LoginService: LoginService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.addToken(request);
    return next.handle(request).pipe(
      map(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // cacheo de estado
            if (event && event.body && typeof event.body.estado != 'undefined' && event.body.estado != 1) {
              throw new Error(event.body.mensaje);
            }
          }
          return event;
        }
      ),
      catchError((error: HttpErrorResponse) => {
        const errorMessage =
          HttpErrorCodes[error.status] || 'Error: ' + error.message;
        if (error.status === 401 || error.status === 403) {
          this.LoginService.logout().then((data: any) => {
            this.ToastService.showToastNew("ERROR", + error?.error?.mensaje ? 'Error: ' + error?.error?.mensaje : 'Error: ' + errorMessage, "error");
          })
        } else {
          this.ToastService.showToastNew("ERROR", error?.error?.mensaje ? 'Error: ' + error?.error?.mensaje : 'Error: ' + errorMessage, "error");
        }
        return throwError(() => error.error.message);
      }))
  }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getDataUser()?.security?.token ? this.tokenService.getDataUser().security?.token : '';
    if (token) {
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      });
      return authReq;
    }
    return request;
  }

}

