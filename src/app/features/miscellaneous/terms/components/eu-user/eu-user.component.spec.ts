import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EuUserComponent } from './eu-user.component';

describe('EuUserComponent', () => {
  let component: EuUserComponent;
  let fixture: ComponentFixture<EuUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EuUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EuUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
