import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment.dev';
import { ICurrency } from '../interfaces/currencies.type';
import { ICurrencyConvert } from '../interfaces/currency-convert.type';
import { IConversionResponse } from '../interfaces/conversion-response.type';
import { IMappedCurrency } from '../interfaces/mapped-currency.type';
import { IHistoryResponse } from '../interfaces/history-response.type';
import { IMultipleRates } from '../interfaces/multiple-rates.type';

@Injectable()
export class CurrencyExchangerService {

  private _currencyExchangerUrl:string = `${environment.apiUrl}`;

  constructor(
    private _httpClient : HttpClient
  ) { }

  getQueryParams(paramsObject:any):HttpParams{
    let query:HttpParams = new HttpParams();
    Object.entries(paramsObject).forEach(([key, value]:[any, any]) => {
      query = query.append(key, value);
    });

    return query;
  }

  getAllCurrencies():Observable<IMappedCurrency[]>{
    return this._httpClient.get<ICurrency>(`${this._currencyExchangerUrl}/currencies`).pipe(
      map((response:ICurrency) => {
        const convertedCurrencies:IMappedCurrency[] = [];
        Object.entries(response.currencies).forEach(([key, value]:[string, string]) => {
          convertedCurrencies.push({
            name:value,
            symbol:key
          });
        });
        return convertedCurrencies;
      })
    );
  }

  convertCurrency(currencyConvert:ICurrencyConvert):Observable<IConversionResponse>{
    return this._httpClient.get<IConversionResponse>(`${this._currencyExchangerUrl}/convert`, {params:this.getQueryParams(currencyConvert), observe:'body'});
  }

  getMultipleRates(from:string, to:string[]):Observable<IMultipleRates>{
    let query:HttpParams = new HttpParams();
    query = query.append('from', from);
    query = query.append('to', to.join(','));

    return this._httpClient.get<IMultipleRates>(`${this._currencyExchangerUrl}/fetch-multi`, {params:query, observe:'body'});
  }

  getCurrencyRateByDate(query:any):Observable<IHistoryResponse>{
    return this._httpClient.get<IHistoryResponse>(`${this._currencyExchangerUrl}/historical`, {params:this.getQueryParams(query), observe:'body'});
  }
}
