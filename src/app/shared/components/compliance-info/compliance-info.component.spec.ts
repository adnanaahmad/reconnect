import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceInfoComponent } from './compliance-info.component';

describe('ComplianceInfoComponent', () => {
  let component: ComplianceInfoComponent;
  let fixture: ComponentFixture<ComplianceInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplianceInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
