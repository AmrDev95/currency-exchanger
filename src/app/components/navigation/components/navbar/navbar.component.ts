import { Component, Input } from '@angular/core';
import { INavItem } from '../../core/interfaces/INavItem';
import { SidenavControlService } from 'src/app/core/services/sidenav-control/sidenav-control.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() navItems:INavItem[] = [];
  
  constructor(
    protected _sideNavControl : SidenavControlService
  ) {
  }

}
