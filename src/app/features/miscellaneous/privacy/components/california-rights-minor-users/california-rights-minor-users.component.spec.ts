import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaliforniaRightsMinorUsersComponent } from './california-rights-minor-users.component';

describe('CaliforniaRightsMinorUsersComponent', () => {
  let component: CaliforniaRightsMinorUsersComponent;
  let fixture: ComponentFixture<CaliforniaRightsMinorUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaliforniaRightsMinorUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaliforniaRightsMinorUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
