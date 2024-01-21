import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { MediaScreenWatcherService } from '../media-screen-watcher/media-screen-watcher.service';

@Injectable()
export class SidenavControlService implements OnDestroy {

  private sideNavToggled:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private unsubscribe:Subject<null> = new Subject<null>();

  get sideNavToggled$():boolean{
    return this.sideNavToggled.getValue();
  }

  set sideNavToggled$(val:boolean){
    this.sideNavToggled.next(val);
  }

  constructor(
    private _mediaScreenWatcher : MediaScreenWatcherService
  ) {
    this.scheckMediaScreen();
   }

  toggleSideNav(){
    this.sideNavToggled.next(
      !this.sideNavToggled.getValue()
    );
  }

  scheckMediaScreen(){
    this._mediaScreenWatcher.watchMediaScreen(['XSmall', 'Small', 'Medium']).pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (isMatched:boolean) => {
        if(!isMatched) this.sideNavToggled.next(false);
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}
