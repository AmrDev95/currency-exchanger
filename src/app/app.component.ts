import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading-bar/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'currency-exchanger';
}
