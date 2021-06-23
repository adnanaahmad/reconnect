import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePreApprovalLetterComponent } from './change-pre-approval-letter.component';

describe('ChangePreApprovalLetterComponent', () => {
  let component: ChangePreApprovalLetterComponent;
  let fixture: ComponentFixture<ChangePreApprovalLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePreApprovalLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePreApprovalLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
