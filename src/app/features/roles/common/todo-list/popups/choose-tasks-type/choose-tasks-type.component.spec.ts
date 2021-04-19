import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTasksTypeComponent } from './choose-tasks-type.component';

describe('ChooseTasksTypeComponent', () => {
  let component: ChooseTasksTypeComponent;
  let fixture: ComponentFixture<ChooseTasksTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseTasksTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseTasksTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
