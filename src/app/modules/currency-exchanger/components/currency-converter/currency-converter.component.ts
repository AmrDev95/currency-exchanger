import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { IMappedCurrency } from '../../core/interfaces/mapped-currency.type';
import { CurrencyExchangerService } from '../../core/services/currency-exchanger.service';
import { IConversionResponse } from '../../core/interfaces/conversion-response.type';
import { ICurrencyListItem } from '../../core/interfaces/currency-list.type';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss']
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {

  currencyConverterForm:FormGroup;
  private unsubscribe:Subject<null> = new Subject<null>();
  allCurrencies:IMappedCurrency[] = [];
  convertedCurrency:IConversionResponse;
  fromName:string;
  toName:string;

  @Input()viewMode:boolean = false;
  @Output()tableData:EventEmitter<ICurrencyListItem[]> = new EventEmitter<ICurrencyListItem[]>();
  @Output()converted:EventEmitter<{rate:number, from:string, to:string}> = new EventEmitter<{rate:number, from:string, to:string}>();

  
  constructor(
    private _formBuilder : FormBuilder,
    private _activatedRoute : ActivatedRoute,
    private _currencyExchangerService : CurrencyExchangerService,
    private _router : Router
  ) {
  }


  ngOnInit(): void {
    this.buildCurrencyConverterForm();
    this.subscribeToRouteParams();
    this.subscribeToRouteData();
  }

  subscribeToRouteParams(){
    this._activatedRoute.paramMap.pipe(takeUntil(this.unsubscribe)).subscribe(
      (params:ParamMap) => {
        if(params.get('currencyFrom') && params.get('currencyTo')){
          this.currencyConverterForm.enable();
          this.currencyConverterForm.patchValue({
            from: params.get('currencyFrom'),
            to: params.get('currencyTo'),
            amount: 1
          });
          this.currencyConverterForm.get('from').disable();
          this.convertCurrencies();
        }
      }
    );
  }

  subscribeToRouteData(){
    this._activatedRoute.data.pipe(takeUntil(this.unsubscribe)).subscribe(
      (data:{allCurrencies:IMappedCurrency[]}) => {
        this.allCurrencies = data.allCurrencies;
      }
    );
  }


  buildCurrencyConverterForm(){
    this.currencyConverterForm = this._formBuilder.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      from: [{value:null, disabled:true}, Validators.required],
      to: [{value:null, disabled:true}, Validators.required]
    });
  }

  getError(control:string, error:string){
    return this.currencyConverterForm.controls[control]?.touched && this.currencyConverterForm.controls[control]?.hasError(error);
  }

  checkFormValidity(){
    if(this.currencyConverterForm.get('amount').invalid){
      this.currencyConverterForm.get('from').disable();
      this.currencyConverterForm.get('to').disable();
    } else{
      if(!this.viewMode){
        this.currencyConverterForm.get('from').enable();
      }
      this.currencyConverterForm.get('to').enable();
    }
  }

  swapFromAndToCurrencies(){
    if(this.currencyConverterForm.invalid) return;
    const fromValue = this.currencyConverterForm.get('from').value;
    this.currencyConverterForm.get('from').patchValue(
      this.currencyConverterForm.get('to').value
    );
    this.currencyConverterForm.get('to').patchValue(fromValue);
    this.convertCurrencies();
  }

  convertCurrencies(){
    if(this.currencyConverterForm.invalid) return;
    this._currencyExchangerService.convertCurrency(this.currencyConverterForm.getRawValue()).pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (convertedCurrency:IConversionResponse) => {
        this.convertedCurrency = JSON.parse(JSON.stringify(convertedCurrency));
        if(!this.viewMode){
          this.addItemToHistoryTable();
        }

        this.converted.emit({
          from: this.currencyConverterForm.get('from').value,
          to:this.currencyConverterForm.get('to').value,
          rate: this.convertedCurrency.result['rate']
        });
      }
    );
  }

  addItemToHistoryTable(){
    let exchangeHistory = JSON.parse(localStorage.getItem('exchangeHistory')) as null | ICurrencyListItem[];
    if(!exchangeHistory){
      exchangeHistory = [];
    }

    const newRecord:ICurrencyListItem = {
      id:exchangeHistory.length+1,
      from:this.currencyConverterForm.get('from').value,
      to:this.currencyConverterForm.get('to').value,
      fromName:this.allCurrencies.find(currency => currency.symbol === this.currencyConverterForm.get('from').value).name,
      toName:this.allCurrencies.find(currency => currency.symbol === this.currencyConverterForm.get('to').value).name,
      fromAmount: this.convertedCurrency.amount,
      toAmount: this.convertedCurrency.result[this.currencyConverterForm.get('to').value],
      rate: this.convertedCurrency.result['rate']
    }

    exchangeHistory.push(newRecord);
    localStorage.setItem('exchangeHistory', JSON.stringify(exchangeHistory));
    this.tableData.emit(exchangeHistory);
  }

  goToDetailsPage(){
    if(this.currencyConverterForm.invalid) return;
    this._router.navigateByUrl(
      `/currency-exchanger/details/${this.currencyConverterForm.get('from').value}/${this.currencyConverterForm.get('to').value}`
    );
  }


  ngOnDestroy(): void {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}
