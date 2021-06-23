import { TestBed } from '@angular/core/testing';

import { PreApprovalHistoryService } from './pre-approval-history.service';

describe('PreApprovalHistoryService', () => {
  let service: PreApprovalHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreApprovalHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
