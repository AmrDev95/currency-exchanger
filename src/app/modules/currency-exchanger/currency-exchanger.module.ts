import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { CurrencyExchangerRoutingModule } from './currency-exchanger-routing.module';
import { CurrencyExchangerComponent } from './components/currency-exchanger/currency-exchanger.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DynamicTableComponent } from 'src/app/components/dynamic-table/dynamic-table.component';
import { CurrencyExchangerHomeComponent } from './currency-exchanger-home/currency-exchanger-home.component';
import { CurrencyConversionDetailsComponent } from './components/currency-conversion-details/currency-conversion-details.component';
import { CurrencyExchangerService } from './core/services/currency-exchanger.service';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CurrencyExchangerComponent,
    CurrencyConverterComponent,
    CurrencyExchangerHomeComponent,
    CurrencyConversionDetailsComponent
  ],

  imports: [
    CommonModule,
    CurrencyExchangerRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DynamicTableComponent,
    ReactiveFormsModule
  ],

  providers:[
    CurrencyExchangerService,
    DecimalPipe
  ]
})
export class CurrencyExchangerModule { }
