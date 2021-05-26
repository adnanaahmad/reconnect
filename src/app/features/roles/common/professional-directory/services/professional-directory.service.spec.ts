import { TestBed } from '@angular/core/testing';

import { ProfessionalDirectoryService } from './professional-directory.service';

describe('ProfessionalDirectoryService', () => {
  let service: ProfessionalDirectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalDirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
