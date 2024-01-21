import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/app/environments/environment.dev';
import { ICurrency } from '../interfaces/currencies.type';
import { ICurrencyConvert } from '../interfaces/currency-convert.type';
import { IConversionResponse } from '../interfaces/conversion-response.type';
import { IMappedCurrency } from '../interfaces/mapped-currency.type';

@Injectable()
export class CurrencyExchangerService {

  private _currencyExchangerUrl:string = `${environment.apiUrl}`;

  constructor(
    private _httpClient : HttpClient
  ) { }

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
    let query:HttpParams = new HttpParams();
    Object.entries(currencyConvert).forEach(([key, value]) => {
      query = query.append(key, value);
    });
    debugger;
    return this._httpClient.get<IConversionResponse>(`${this._currencyExchangerUrl}/convert`, {params:query, observe:'body'});
  }
}
