import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPartnersProfileComponent } from './view-partners-profile.component';

describe('ViewPartnersProfileComponent', () => {
  let component: ViewPartnersProfileComponent;
  let fixture: ComponentFixture<ViewPartnersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPartnersProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPartnersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
