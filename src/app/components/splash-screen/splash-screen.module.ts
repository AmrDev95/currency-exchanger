import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { SplashScreenService } from './splash-screen.service';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    MatIconModule
  ],

  providers:[
    SplashScreenService
  ]
})
export class SplashScreenModule { }
