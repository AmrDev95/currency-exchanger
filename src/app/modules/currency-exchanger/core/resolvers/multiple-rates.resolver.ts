import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IMultipleRates } from '../interfaces/multiple-rates.type';
import { CurrencyExchangerService } from '../services/currency-exchanger.service';
import { inject } from '@angular/core';

export const multipleRatesResolver: ResolveFn<IMultipleRates> = (
  route:ActivatedRouteSnapshot, 
  state:RouterStateSnapshot,
  ):Observable<IMultipleRates> => {
  
  const predefinedCurrencies:string[] = ['EUR', 'USD', 'EGP', 'JPY', 'GBP', 'AUD'];
  const _currencyExchangerService = inject(CurrencyExchangerService);
  return _currencyExchangerService.getMultipleRates(route.paramMap.get('currencyFrom'), predefinedCurrencies);
};
