import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferralLineageComponent } from './referral-lineage.component';

describe('ReferralLineageComponent', () => {
  let component: ReferralLineageComponent;
  let fixture: ComponentFixture<ReferralLineageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferralLineageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferralLineageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
