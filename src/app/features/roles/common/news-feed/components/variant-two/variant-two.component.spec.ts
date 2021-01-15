import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantTwoComponent } from './variant-two.component';

describe('VariantTwoComponent', () => {
  let component: VariantTwoComponent;
  let fixture: ComponentFixture<VariantTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
