import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FhaComponent } from './fha.component';

describe('FhaComponent', () => {
  let component: FhaComponent;
  let fixture: ComponentFixture<FhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
