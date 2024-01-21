import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConversionDetailsComponent } from './currency-conversion-details.component';

describe('CurrencyConversionDetailsComponent', () => {
  let component: CurrencyConversionDetailsComponent;
  let fixture: ComponentFixture<CurrencyConversionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrencyConversionDetailsComponent]
    });
    fixture = TestBed.createComponent(CurrencyConversionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
