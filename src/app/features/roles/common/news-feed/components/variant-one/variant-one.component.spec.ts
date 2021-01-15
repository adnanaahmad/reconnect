import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantOneComponent } from './variant-one.component';

describe('VariantOneComponent', () => {
  let component: VariantOneComponent;
  let fixture: ComponentFixture<VariantOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
