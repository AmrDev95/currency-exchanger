import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationModule } from '../../navigation/navigation.module';
import { SidenavControlModule } from 'src/app/core/services/sidenav-control/sidenav-control.module';



@NgModule({
  declarations: [
    MainLayoutComponent
  ],

  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    NavigationModule,
    MatSidenavModule,
    SidenavControlModule
  ],

  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
