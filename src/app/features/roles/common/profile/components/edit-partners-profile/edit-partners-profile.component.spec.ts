import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartnersProfileComponent } from './edit-partners-profile.component';

describe('EditPartnersProfileComponent', () => {
  let component: EditPartnersProfileComponent;
  let fixture: ComponentFixture<EditPartnersProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPartnersProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartnersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
