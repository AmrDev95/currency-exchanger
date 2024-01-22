import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, filter, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenService {


  constructor(
    private _router : Router
  ) {
    this.initiallyCloseSplashScreen();
   }

   initiallyCloseSplashScreen(){
    this._router.events.pipe(
                filter(event => event instanceof NavigationEnd),
                take(1)
              ).subscribe(() => {
              this.stopSplashScreen();
            }
    );
   }

  stopSplashScreen(){
    document.body.classList.add('hide-splash-screen');
  }

  startSplashScreen(){
    document.body.classList.remove('hide-splash-screen');
  }


}
