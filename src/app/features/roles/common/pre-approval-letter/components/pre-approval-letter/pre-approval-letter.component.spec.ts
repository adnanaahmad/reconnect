import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreApprovalLetterComponent } from './pre-approval-letter.component';

describe('PreApprovalLetterComponent', () => {
  let component: PreApprovalLetterComponent;
  let fixture: ComponentFixture<PreApprovalLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreApprovalLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreApprovalLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
