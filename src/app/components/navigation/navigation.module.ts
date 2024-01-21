import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HorizontalNavItemComponent } from './components/horizontal-nav-item/horizontal-nav-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';





@NgModule({
  declarations: [
    NavbarComponent, 
    HorizontalNavItemComponent
  ],

  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    RouterModule
  ],

  exports: [
    NavbarComponent
  ]
})
export class NavigationModule { }
