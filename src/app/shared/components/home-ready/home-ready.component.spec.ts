import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeReadyComponent } from './home-ready.component';

describe('HomeReadyComponent', () => {
  let component: HomeReadyComponent;
  let fixture: ComponentFixture<HomeReadyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeReadyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
