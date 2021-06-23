import { TestBed } from '@angular/core/testing';

import { PreApprovalLetterService } from './pre-approval-letter.service';

describe('PreApprovalLetterService', () => {
  let service: PreApprovalLetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreApprovalLetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
