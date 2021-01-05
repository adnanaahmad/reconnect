import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentVsBuyingComponent } from './rent-vs-buying.component';

describe('RentVsBuyingComponent', () => {
  let component: RentVsBuyingComponent;
  let fixture: ComponentFixture<RentVsBuyingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentVsBuyingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentVsBuyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
