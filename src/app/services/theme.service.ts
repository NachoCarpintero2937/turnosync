import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private sanitizer: DomSanitizer) {}

  setPrimaryColor(color: string) {
    const themeContent = `
      @import '~@angular/material/theming';

      $primary: mat-palette($md-mcgpalette0, ${color});
      $soyfocus-primary: $primary;

      @include mat-core();
      @include angular-material-theme($soyfocus-theme);
    `;

    const blob = new Blob([themeContent], { type: 'text/css' });
    const url = URL.createObjectURL(blob);

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
