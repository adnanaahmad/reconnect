import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingPersonalDataComponent } from './using-personal-data.component';

describe('UsingPersonalDataComponent', () => {
  let component: UsingPersonalDataComponent;
  let fixture: ComponentFixture<UsingPersonalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsingPersonalDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsingPersonalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
