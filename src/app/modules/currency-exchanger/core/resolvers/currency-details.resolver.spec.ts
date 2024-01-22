import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { currencyDetailsResolver } from './currency-details.resolver';

describe('currencyDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => currencyDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
