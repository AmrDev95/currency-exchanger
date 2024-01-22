import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyExchangerComponent } from './components/currency-exchanger/currency-exchanger.component';
import { CurrencyExchangerHomeComponent } from './currency-exchanger-home/currency-exchanger-home.component';
import { CurrencyConversionDetailsComponent } from './components/currency-conversion-details/currency-conversion-details.component';
import { getCurrenciesResolver } from './core/resolvers/get-currencies.resolver';
import { currencyDetailsResolver } from './core/resolvers/currency-details.resolver';
import { multipleRatesResolver } from './core/resolvers/multiple-rates.resolver';

const routes: Routes = [
  {
    path:'',
    component:CurrencyExchangerComponent,
    children: [
      {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
      },

      {
        path:'home',
        component:CurrencyExchangerHomeComponent,
        title:'Homepage',
        resolve:{
          allCurrencies: getCurrenciesResolver
        }
      },

      {
        path:'details/:currencyFrom/:currencyTo',
        component:CurrencyConversionDetailsComponent,
        title:'Conversion details',
        resolve:{
          allCurrencies: getCurrenciesResolver,
          currencyByDate: currencyDetailsResolver,
          multipleRates: multipleRatesResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyExchangerRoutingModule { }
