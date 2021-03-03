import { TestBed } from '@angular/core/testing';

import { BuyerTransactionDetailsService } from './buyer-transaction-details.service';

describe('BuyerTransactionDetailsService', () => {
  let service: BuyerTransactionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyerTransactionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
