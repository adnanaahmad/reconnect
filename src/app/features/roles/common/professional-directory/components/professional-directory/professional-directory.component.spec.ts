import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalDirectoryComponent } from './professional-directory.component';

describe('ProfessionalDirectoryComponent', () => {
  let component: ProfessionalDirectoryComponent;
  let fixture: ComponentFixture<ProfessionalDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalDirectoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessionalDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
