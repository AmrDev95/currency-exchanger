import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { multipleRatesResolver } from './multiple-rates.resolver';

describe('multipleRatesResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => multipleRatesResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
