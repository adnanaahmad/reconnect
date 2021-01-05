import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPropertyComponent } from './subject-property.component';

describe('SubjectPropertyComponent', () => {
  let component: SubjectPropertyComponent;
  let fixture: ComponentFixture<SubjectPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
