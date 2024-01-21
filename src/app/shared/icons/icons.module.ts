import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';



@NgModule({
  declarations: [],
  
  imports: [
    CommonModule
  ]
})
export class IconsModule {
  constructor(
    private _matIconRegistry : MatIconRegistry,
    private _domSanitizer : DomSanitizer
  ) {
    this._matIconRegistry.addSvgIconSetInNamespace('heroicons',this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/heroicons.svg'));
  }
}
