import { Component, OnInit } from '@angular/core';
import { ICurrencyListItem } from '../core/interfaces/currency-list.type';
import { HistoryTableMap } from '../core/config/history-table-mapper';
import { Router } from '@angular/router';
import { IStaticAmountItem } from '../core/interfaces/static-amount-table.type';
import { DecimalPipe } from '@angular/common';


@Component({
  selector: 'app-currency-exchanger-home',
  templateUrl: './currency-exchanger-home.component.html',
  styleUrls: ['./currency-exchanger-home.component.scss']
})
export class CurrencyExchangerHomeComponent implements OnInit {

  tableData:ICurrencyListItem[] = [];
  tableMap = HistoryTableMap;
  fixedAmounts:number[] = [10, 20, 30, 100, 200, 300, 1000];
  fromToTableData:IStaticAmountItem[] = [];
  toFromTableData:IStaticAmountItem[] = [];

  
  constructor(
    private _router : Router,
    private _decimalPipe : DecimalPipe
  ) {
  }

  ngOnInit(): void {
    this.checkSavedData();
  }

  checkSavedData(){
    const savedData = JSON.parse(localStorage.getItem('exchangeHistory')) as null | ICurrencyListItem[];
    if(savedData === null) return;

    this.tableData = savedData;
  }

  getUpdatedTableData(tableData:ICurrencyListItem[]){
    this.tableData = tableData;
  }

  goToEditPage(event:ICurrencyListItem){
    console.log(event);
    this._router.navigateByUrl(`currency-exchanger/details/${event.from}/${event.to}`);
  }

  openDeleteConfirmation(event:ICurrencyListItem){
    let historyDetails = JSON.parse(localStorage.getItem('exchangeHistory')) as null | ICurrencyListItem[];
    if(historyDetails === null) return;

    historyDetails = historyDetails.filter(history => history.id != event.id);
    localStorage.setItem('exchangeHistory', JSON.stringify(historyDetails));
    this.tableData = historyDetails;
  }

  calculateConstantAmounts(convertedAmount:{rate:number, from:string, to:string}){
    const fromToTable:IStaticAmountItem[] = [];
    const toFromTable:IStaticAmountItem[] = [];
    this.fixedAmounts.forEach(amount => {
      fromToTable.push({
        From:`${this._decimalPipe.transform(amount)} ${convertedAmount.from}`,
        To: `${this._decimalPipe.transform(amount * convertedAmount.rate)} ${convertedAmount.to}`
      });

      toFromTable.push({
        From: `${this._decimalPipe.transform(amount)} ${convertedAmount.to}`,
        To: `${this._decimalPipe.transform(amount / convertedAmount.rate)} ${convertedAmount.from}`
      });
    });

    this.fromToTableData = fromToTable;
    this.toFromTableData = toFromTable;
  }

}
