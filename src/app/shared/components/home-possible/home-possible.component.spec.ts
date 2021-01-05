import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePossibleComponent } from './home-possible.component';

describe('HomePossibleComponent', () => {
  let component: HomePossibleComponent;
  let fixture: ComponentFixture<HomePossibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePossibleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePossibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
