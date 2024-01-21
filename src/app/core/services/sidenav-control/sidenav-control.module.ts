import { NgModule } from '@angular/core';
import { SidenavControlService } from './sidenav-control.service';
import { MediaScreenWatcherModule } from '../media-screen-watcher/media-screen-watcher.module';


@NgModule({

  imports:[
    MediaScreenWatcherModule
  ],

  providers:[
    SidenavControlService
  ]

})
export class SidenavControlModule { }
