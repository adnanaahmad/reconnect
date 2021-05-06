import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSideNavComponent } from './landing-side-nav.component';

describe('LandingSideNavComponent', () => {
  let component: LandingSideNavComponent;
  let fixture: ComponentFixture<LandingSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingSideNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
