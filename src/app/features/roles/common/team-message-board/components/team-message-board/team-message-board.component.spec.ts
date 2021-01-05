import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMessageBoardComponent } from './team-message-board.component';

describe('TeamMessageBoardComponent', () => {
  let component: TeamMessageBoardComponent;
  let fixture: ComponentFixture<TeamMessageBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMessageBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMessageBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
