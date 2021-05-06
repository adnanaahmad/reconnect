import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRestrictionComponent } from './content-restriction.component';

describe('ContentRestrictionComponent', () => {
  let component: ContentRestrictionComponent;
  let fixture: ComponentFixture<ContentRestrictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentRestrictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRestrictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
