import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsdaComponent } from './usda.component';

describe('UsdaComponent', () => {
  let component: UsdaComponent;
  let fixture: ComponentFixture<UsdaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsdaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
