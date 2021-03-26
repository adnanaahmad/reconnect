import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBorrowerComponent } from './add-new-borrower.component';

describe('AddNewBorrowerComponent', () => {
  let component: AddNewBorrowerComponent;
  let fixture: ComponentFixture<AddNewBorrowerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBorrowerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBorrowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
