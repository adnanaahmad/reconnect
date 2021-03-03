import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPropertyTemplateComponent } from './subject-property-template.component';

describe('SubjectPropertyTemplateComponent', () => {
  let component: SubjectPropertyTemplateComponent;
  let fixture: ComponentFixture<SubjectPropertyTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectPropertyTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectPropertyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
