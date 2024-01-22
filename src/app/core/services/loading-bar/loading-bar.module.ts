import { NgModule } from '@angular/core';
import { LoadingService } from './loading.service';
import { LoadingBarComponent } from './loading-bar/loading-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  providers:[
    LoadingService
  ],

  imports: [
    MatProgressBarModule
  ],

  declarations: [
    LoadingBarComponent
  ],

  exports: [
    LoadingBarComponent
  ]
})
export class LoadingBarModule { }
