import { Component } from '@angular/core';
import { NavItems } from 'src/app/components/navigation/core/configs/navigation.config';
import { SplashScreenService } from 'src/app/components/splash-screen/splash-screen.service';
import { LoadingService } from 'src/app/core/services/loading-bar/loading.service';
import { SidenavControlService } from 'src/app/core/services/sidenav-control/sidenav-control.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  navItems = NavItems;

  
  constructor(
    protected _sideNavControl : SidenavControlService,
    protected _splashScreenService : SplashScreenService,
    protected _loadingService : LoadingService
  ) {}

  

}
