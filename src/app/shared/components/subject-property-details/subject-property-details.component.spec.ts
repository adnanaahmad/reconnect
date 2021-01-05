import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPropertyDetailsComponent } from './subject-property-details.component';

describe('SubjectPropertyDetailsComponent', () => {
  let component: SubjectPropertyDetailsComponent;
  let fixture: ComponentFixture<SubjectPropertyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectPropertyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectPropertyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
