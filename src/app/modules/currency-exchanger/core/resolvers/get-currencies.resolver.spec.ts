import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { getCurrenciesResolver } from './get-currencies.resolver';

describe('getCurrenciesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => getCurrenciesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
