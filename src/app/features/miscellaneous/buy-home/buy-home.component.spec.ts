import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyHomeComponent } from './buy-home.component';

describe('BuyHomeComponent', () => {
  let component: BuyHomeComponent;
  let fixture: ComponentFixture<BuyHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
