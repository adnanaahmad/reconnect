import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsFeedComponent } from './add-news-feed.component';

describe('AddNewsFeedComponent', () => {
  let component: AddNewsFeedComponent;
  let fixture: ComponentFixture<AddNewsFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewsFeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
