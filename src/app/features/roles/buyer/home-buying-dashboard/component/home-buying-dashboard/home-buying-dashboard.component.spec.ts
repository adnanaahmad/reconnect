import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBuyingDashboardComponent } from './home-buying-dashboard.component';

describe('HomeBuyingDashboardComponent', () => {
  let component: HomeBuyingDashboardComponent;
  let fixture: ComponentFixture<HomeBuyingDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeBuyingDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBuyingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
