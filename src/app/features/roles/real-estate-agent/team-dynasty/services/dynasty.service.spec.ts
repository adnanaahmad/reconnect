import { TestBed } from '@angular/core/testing';

import { DynastyService } from './dynasty.service';

describe('DynastyService', () => {
  let service: DynastyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynastyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
