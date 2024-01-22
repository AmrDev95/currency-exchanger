import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HorizontalNavItemComponent } from './components/horizontal-nav-item/horizontal-nav-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MediaScreenWatcherModule } from 'src/app/core/services/media-screen-watcher/media-screen-watcher.module';
import { VerticalNavigationComponent } from './components/vertical-navigation/vertical-navigation.component';
import { VerticalNavigationItemComponent } from './components/vertical-navigation-item/vertical-navigation-item.component';
import { SidenavControlModule } from 'src/app/core/services/sidenav-control/sidenav-control.module';






@NgModule({
  declarations: [
    NavbarComponent, 
    HorizontalNavItemComponent, VerticalNavigationComponent, VerticalNavigationItemComponent
  ],

  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule,
    MediaScreenWatcherModule,
    SidenavControlModule
  ],

  exports: [
    NavbarComponent,
    VerticalNavigationComponent
  ]
})
export class NavigationModule { }
