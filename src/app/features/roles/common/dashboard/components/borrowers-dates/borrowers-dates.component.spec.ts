import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowersDatesComponent } from './borrowers-dates.component';

describe('BorrowersDatesComponent', () => {
  let component: BorrowersDatesComponent;
  let fixture: ComponentFixture<BorrowersDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowersDatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowersDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
