import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCheckboxComponent } from './loan-checkbox.component';

describe('LoanCheckboxComponent', () => {
  let component: LoanCheckboxComponent;
  let fixture: ComponentFixture<LoanCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
