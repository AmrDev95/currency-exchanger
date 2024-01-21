import { Component, Input } from '@angular/core';
import { INavItem } from '../../core/interfaces/INavItem';

@Component({
  selector: 'app-horizontal-nav-item',
  templateUrl: './horizontal-nav-item.component.html',
  styleUrls: ['./horizontal-nav-item.component.scss']
})
export class HorizontalNavItemComponent {

  @Input() navItem:INavItem;

}
