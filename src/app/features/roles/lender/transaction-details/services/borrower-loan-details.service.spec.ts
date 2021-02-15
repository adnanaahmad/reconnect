import { TestBed } from '@angular/core/testing';

import { BorrowerLoanDetailsService } from './borrower-loan-details.service';

describe('BorrowerLoanDetailsService', () => {
  let service: BorrowerLoanDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowerLoanDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
