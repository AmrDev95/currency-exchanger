import { Component, Input } from '@angular/core';
import { INavItem } from '../../core/interfaces/INavItem';

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html',
  styleUrls: ['./vertical-navigation.component.scss']
})
export class VerticalNavigationComponent {

  @Input() navigationItems:INavItem[] = [];

}
