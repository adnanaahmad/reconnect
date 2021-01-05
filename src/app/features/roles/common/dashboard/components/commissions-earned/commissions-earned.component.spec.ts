import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionsEarnedComponent } from './commissions-earned.component';

describe('CommissionsEarnedComponent', () => {
  let component: CommissionsEarnedComponent;
  let fixture: ComponentFixture<CommissionsEarnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommissionsEarnedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommissionsEarnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
