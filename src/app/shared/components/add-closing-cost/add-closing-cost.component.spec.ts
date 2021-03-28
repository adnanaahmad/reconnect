import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClosingCostComponent } from './add-closing-cost.component';

describe('AddClosingCostComponent', () => {
  let component: AddClosingCostComponent;
  let fixture: ComponentFixture<AddClosingCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClosingCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClosingCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
