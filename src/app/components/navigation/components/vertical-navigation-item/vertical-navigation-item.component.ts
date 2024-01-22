import { Component, Input } from '@angular/core';
import { INavItem } from '../../core/interfaces/INavItem';
import { expandCollapse } from 'src/app/animations/expand-collapse';
import { Router } from '@angular/router';
import { SidenavControlService } from 'src/app/core/services/sidenav-control/sidenav-control.service';

@Component({
  selector: 'app-vertical-navigation-item',
  templateUrl: './vertical-navigation-item.component.html',
  styleUrls: ['./vertical-navigation-item.component.scss'],
  animations: [expandCollapse]
})
export class VerticalNavigationItemComponent {

  @Input() navItem:INavItem;
  navItemToggled:boolean = false;

  constructor(
    private _router : Router,
    private _sideNavControl : SidenavControlService
  ) {
  }

  checkAndToggle(navItem:INavItem){
    if(navItem.children.length <= 0) {
      this._router.navigateByUrl(`${navItem.routeUrl}`);
      this._sideNavControl.toggleSideNav();
      return;
    }

    this.navItemToggled = !this.navItemToggled;
  }

}
