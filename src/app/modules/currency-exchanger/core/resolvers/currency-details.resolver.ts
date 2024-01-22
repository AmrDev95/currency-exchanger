import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { inject } from '@angular/core';
import { CurrencyExchangerService } from '../services/currency-exchanger.service';
import { DatePipe } from '@angular/common';
import { IHistoryResponse } from '../interfaces/history-response.type';
import { IHistoricalRateItem } from '../interfaces/rate-dates.type';

export const currencyDetailsResolver: ResolveFn<IHistoricalRateItem[]> = (
  route:ActivatedRouteSnapshot, 
  state:RouterStateSnapshot,
  ):Observable<IHistoricalRateItem[]> => {

  
  const _currencyExchangerService = inject(CurrencyExchangerService);
  const _datePipe = inject(DatePipe);
  const dates = calculateDates(_datePipe);

  /*
  due to the limitations of the APIs I'm using, I won't be able to
  use any date with more than 14 days before/ater the current date,
  so I'll be adding last day's date in the 3 parameters
  */
  return forkJoin([
    _currencyExchangerService.getCurrencyRateByDate({
      date:dates.lastDay,
      from:route.paramMap.get('currencyFrom'),
      to:route.paramMap.get('currencyTo'),
    }),
    _currencyExchangerService.getCurrencyRateByDate({
      date:dates.lastDay,
      from:route.paramMap.get('currencyFrom'),
      to:route.paramMap.get('currencyTo'),
    }),
    _currencyExchangerService.getCurrencyRateByDate({
      date:dates.lastDay,
      from:route.paramMap.get('currencyFrom'),
      to:route.paramMap.get('currencyTo'),
    })
  ]).pipe(
    map((responses:IHistoryResponse[]) => {
      const tableItems:IHistoricalRateItem[] = [];
      responses.forEach(res => {
        const element:IHistoricalRateItem = {
          from:res.base,
          to: route.paramMap.get('currencyTo'),
          date: res.date,
          rate: res.results[route.paramMap.get('currencyTo')]
        };
        tableItems.push(element);
      });

      return tableItems;
    })
  )
}


function calculateDates(datePipe:DatePipe):{lastDay:string, lastMonth:string, lastYear:string}{
  const today = new Date();
  const lastDay = new Date(today);
  lastDay.setDate(today.getDate() - 1);

  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);

  return {
    lastDay: datePipe.transform(lastDay, 'yyyy-MM-dd'),
    lastMonth: datePipe.transform(lastMonth, 'yyyy-MM-dd'),
    lastYear: datePipe.transform(lastYear, 'yyyy-MM-dd')
  }
}