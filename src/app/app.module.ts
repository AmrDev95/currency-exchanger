import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layouts/layout/layout.component';
import { MainLayoutModule } from './components/layouts/main-layout/main-layout.module';
import { IconsModule } from './shared/icons/icons.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/auth/auth.interceptor';
import { DatePipe } from '@angular/common';
import { SplashScreenModule } from './components/splash-screen/splash-screen.module';
import { SplashScreenComponent } from './components/splash-screen/splash-screen/splash-screen.component';
import { MatIconModule } from '@angular/material/icon';
import { LoadingBarModule } from './core/services/loading-bar/loading-bar.module';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    SplashScreenComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainLayoutModule,
    IconsModule,
    HttpClientModule,
    SplashScreenModule,
    MatIconModule,
    LoadingBarModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DatePipe
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
