import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/header/header.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt-interceptor.interceptor';
import { NotifierModule } from 'angular-notifier';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData,DatePipe } from '@angular/common';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        HeaderModule,
        BrowserAnimationsModule,
        NotifierModule,
        NgxPermissionsModule.forRoot()], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: LOCALE_ID, useValue: 'es' },
        DatePipe,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {
  constructor() {
    registerLocaleData(localeEs);
  }
}
