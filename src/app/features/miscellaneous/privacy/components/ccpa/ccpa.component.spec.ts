import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpaComponent } from './ccpa.component';

describe('CcpaComponent', () => {
  let component: CcpaComponent;
  let fixture: ComponentFixture<CcpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CcpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
