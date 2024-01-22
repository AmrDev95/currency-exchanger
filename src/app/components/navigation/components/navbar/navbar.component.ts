import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { INavItem } from '../../core/interfaces/INavItem';
import { SidenavControlService } from 'src/app/core/services/sidenav-control/sidenav-control.service';
import { MediaScreenWatcherService } from 'src/app/core/services/media-screen-watcher/media-screen-watcher.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  @Input() navItems:INavItem[] = [];
  private unsubscribe:Subject<null> = new Subject<null>();
  isVerticalNavigation:boolean = false;
  
  constructor(
    protected _sideNavControl : SidenavControlService,
    private _mediaScreenWatcher : MediaScreenWatcherService
  ) {
  }

  ngOnInit(): void {
    this.subscribeToMediaScreenWatcherService();
  }

  subscribeToMediaScreenWatcherService(){
    this._mediaScreenWatcher.watchMediaScreen(['XSmall']).pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (isMatched:boolean) => {
        if(isMatched) this.isVerticalNavigation = true
        else this.isVerticalNavigation = false;
      }
    );
  }

  toggleSideNav(){
    this._sideNavControl.toggleSideNav();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

}
