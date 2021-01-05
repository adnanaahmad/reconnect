import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSalesComponent } from './personal-sales.component';

describe('PersonalSalesComponent', () => {
  let component: PersonalSalesComponent;
  let fixture: ComponentFixture<PersonalSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
