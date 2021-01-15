import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantThreeComponent } from './variant-three.component';

describe('VariantThreeComponent', () => {
  let component: VariantThreeComponent;
  let fixture: ComponentFixture<VariantThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VariantThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
