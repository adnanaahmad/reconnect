import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyAdComponent } from './property-ad.component';

describe('PropertyAdComponent', () => {
  let component: PropertyAdComponent;
  let fixture: ComponentFixture<PropertyAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
