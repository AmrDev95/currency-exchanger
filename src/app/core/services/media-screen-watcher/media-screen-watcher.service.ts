import { Injectable, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject, map, takeUntil } from 'rxjs';

@Injectable()
export class MediaScreenWatcherService implements OnDestroy {

  private unsubscribe:Subject<null> = new Subject<null>();
  private screenSizeMapper:any = {
    'XSmall': Breakpoints.XSmall,
    'Small': Breakpoints.Small,
    'Medium': Breakpoints.Medium,
    'Large': Breakpoints.Large,
    'XLarge': Breakpoints.XLarge
  };

  constructor(
    private _breakpointObserver : BreakpointObserver
  ) { }

  watchMediaScreen(sizes: string[]):Observable<boolean>{
    const breakpoints = sizes.map(size => this.screenSizeMapper[size]).filter(Boolean);
    return this._breakpointObserver.observe(breakpoints).pipe(
      map(result => result.matches)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}
