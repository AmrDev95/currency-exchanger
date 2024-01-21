import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layouts/layout/layout.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'currency-exchanger',
    pathMatch:'full'
  },
  {
    path:'currency-exchanger',
    component:LayoutComponent,
    children:[
      {path:'', loadChildren: () => import('./modules/currency-exchanger/currency-exchanger.module').then(m => m.CurrencyExchangerModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
