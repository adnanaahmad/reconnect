import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyProtectionActComponent } from './privacy-protection-act.component';

describe('PrivacyProtectionActComponent', () => {
  let component: PrivacyProtectionActComponent;
  let fixture: ComponentFixture<PrivacyProtectionActComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyProtectionActComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyProtectionActComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
