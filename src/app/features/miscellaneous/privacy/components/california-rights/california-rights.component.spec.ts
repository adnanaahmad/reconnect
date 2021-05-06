import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaliforniaRightsComponent } from './california-rights.component';

describe('CaliforniaRightsComponent', () => {
  let component: CaliforniaRightsComponent;
  let fixture: ComponentFixture<CaliforniaRightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaliforniaRightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaliforniaRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
