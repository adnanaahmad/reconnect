import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamPersonComponent } from './team-person.component';

describe('TeamPersonComponent', () => {
  let component: TeamPersonComponent;
  let fixture: ComponentFixture<TeamPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
