import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantFourComponent } from './variant-four.component';

describe('VariantFourComponent', () => {
  let component: VariantFourComponent;
  let fixture: ComponentFixture<VariantFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
