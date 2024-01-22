import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HistoricalRateMap } from '../../core/config/history-table-mapper';
import { IHistoricalRateItem } from '../../core/interfaces/rate-dates.type';
import { IMultipleRates } from '../../core/interfaces/multiple-rates.type';
import { DecimalPipe } from '@angular/common';
import { IMappedCurrency } from '../../core/interfaces/mapped-currency.type';

@Component({
  selector: 'app-currency-conversion-details',
  templateUrl: './currency-conversion-details.component.html',
  styleUrls: ['./currency-conversion-details.component.scss']
})
export class CurrencyConversionDetailsComponent implements OnInit, OnDestroy {

  private unsubscribe:Subject<null> = new Subject<null>();
  fromCurrency:string = '';
  toCurrency:string = '';
  currencyObjectValues:any = null;

  historyRateTableData:IHistoricalRateItem[] = [];
  historicalRateMap = HistoricalRateMap;
  allCurrencies:IMappedCurrency[] = [];
  fromToTable:any[] = [];
  toFromTable:any[] = [];

  fromCurrencyName:string;
  toCurrencyName:string;
  
  constructor(
    private _activatedRoute : ActivatedRoute,
    private _decimalPipe : DecimalPipe
  ) {
  }

  ngOnInit(): void {
    this.getCurrenciesFromRoute();
    this.getHistoricalDataFromRoute();
    this.getCurrenciesNames();
  }

  

  getHistoricalDataFromRoute(){
    this._activatedRoute.data.pipe(takeUntil(this.unsubscribe)).subscribe(
      (data:{allCurrencies:IMappedCurrency[], currencyByDate:IHistoricalRateItem[], multipleRates:IMultipleRates}) => {
        this.historyRateTableData = data.currencyByDate.map(el => {
          el.rate = this._decimalPipe.transform(el.rate);
          return el;
        });

        this.allCurrencies = data.allCurrencies;
        console.log(data.multipleRates);
        this.getCurrenciesNames();
        this.mapMultipleCurrenciesTable(data.multipleRates);
      }
    );
  }

  mapMultipleCurrenciesTable(multipleRates:IMultipleRates){
    const fromToTable:any[] = [];
    const toFromTable:any[] = [];
    Object.entries(multipleRates.results).forEach(([key, value]:[any, any]) => {
      fromToTable.push({
        Currency : `1${multipleRates.base}`,
        Rate : `${this._decimalPipe.transform(value)} ${key}`
      });

      toFromTable.push({
        Currency: `1 ${key}`,
        Rate : `${this._decimalPipe.transform(1/value)} ${multipleRates.base}`
      })
    });
    
    this.fromToTable = fromToTable;
    this.toFromTable = toFromTable;
  }

  getCurrenciesFromRoute(){
    this._activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe(
      (params:ParamMap) => {
        this.fromCurrency = params.get('currencyFrom');
        this.toCurrency = params.get('currencyTo');
        this.sendCurrencyValuesToConverter();
      }
    );
  }

  getCurrenciesNames(){
    const filteredNames:IMappedCurrency[] = this.allCurrencies.filter(el => el.symbol === this.fromCurrency || el.symbol === this.toCurrency);
    this.fromCurrencyName = filteredNames.find(el => el.symbol === this.fromCurrency).name;
    this.toCurrencyName = filteredNames.find(el => el.symbol === this.toCurrency).name;
    console.log(this.fromCurrencyName);
    console.log(this.toCurrencyName);
  }

  sendCurrencyValuesToConverter(){
    if(this.fromCurrency === '' || this.toCurrency === '') return;
    this.currencyObjectValues = {
      from:this.fromCurrency,
      to:this.toCurrency,
      amount: 1
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }


}
