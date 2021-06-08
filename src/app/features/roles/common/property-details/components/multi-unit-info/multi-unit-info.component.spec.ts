import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiUnitInfoComponent } from './multi-unit-info.component';

describe('MultiUnitInfoComponent', () => {
  let component: MultiUnitInfoComponent;
  let fixture: ComponentFixture<MultiUnitInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiUnitInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiUnitInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
