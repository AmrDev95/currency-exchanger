import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { IMappedCurrency } from '../interfaces/mapped-currency.type';
import { CurrencyExchangerService } from '../services/currency-exchanger.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const getCurrenciesResolver: ResolveFn<any> = (
  route:ActivatedRouteSnapshot, 
  state:RouterStateSnapshot,
  ):Observable<IMappedCurrency[]> => {
  
  const _currencyExchangerService = inject(CurrencyExchangerService);
  return _currencyExchangerService.getAllCurrencies()
};
