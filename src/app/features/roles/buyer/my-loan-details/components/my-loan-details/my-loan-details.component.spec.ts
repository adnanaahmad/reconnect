import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLoanDetailsComponent } from './my-loan-details.component';

describe('MyLoanDetailsComponent', () => {
  let component: MyLoanDetailsComponent;
  let fixture: ComponentFixture<MyLoanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyLoanDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLoanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
