import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpretaionComponent } from './interpretaion.component';

describe('InterpretaionComponent', () => {
  let component: InterpretaionComponent;
  let fixture: ComponentFixture<InterpretaionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpretaionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpretaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
