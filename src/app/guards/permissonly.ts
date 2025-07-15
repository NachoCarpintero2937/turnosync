import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class PermissOnly {
  constructor(
    private router: Router,
    private permissionsService: NgxPermissionsService) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requiredPermissions = route.data['permissions'].only;
    if (requiredPermissions && Array.isArray(requiredPermissions)) {
      // Verificar si el usuario tiene al menos uno de los permisos requeridos
      return this.permissionsService.hasPermission(requiredPermissions)
        .then(hasPermission => {
          
          if (hasPermission) {
            return true; // El usuario tiene acceso
          } else {
            // Redireccionar al usuario a una página de acceso denegado o a otra página
            return this.router.createUrlTree(['/**']);
          }
        })
        .catch(error => {
          return false;
        });
    }

    return true;
  }
}
