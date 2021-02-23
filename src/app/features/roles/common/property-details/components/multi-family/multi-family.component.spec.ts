import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiFamilyComponent } from './multi-family.component';

describe('MultiFamilyComponent', () => {
  let component: MultiFamilyComponent;
  let fixture: ComponentFixture<MultiFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiFamilyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
