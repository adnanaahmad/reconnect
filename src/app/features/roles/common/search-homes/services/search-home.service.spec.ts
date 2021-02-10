import { TestBed } from '@angular/core/testing';

import { SearchHomeService } from './search-home.service';

describe('SearchHomeService', () => {
  let service: SearchHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
