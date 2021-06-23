import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLetterButtonComponent } from './change-letter-button.component';

describe('ChangeLetterButtonComponent', () => {
  let component: ChangeLetterButtonComponent;
  let fixture: ComponentFixture<ChangeLetterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeLetterButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLetterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
