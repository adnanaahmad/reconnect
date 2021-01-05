import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBuying101Component } from './home-buying101.component';

describe('HomeBuying101Component', () => {
  let component: HomeBuying101Component;
  let fixture: ComponentFixture<HomeBuying101Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBuying101Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBuying101Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
