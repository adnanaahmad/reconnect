import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreApprovalHistoryComponent } from './pre-approval-history.component';

describe('PreApprovalHistoryComponent', () => {
  let component: PreApprovalHistoryComponent;
  let fixture: ComponentFixture<PreApprovalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreApprovalHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreApprovalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
