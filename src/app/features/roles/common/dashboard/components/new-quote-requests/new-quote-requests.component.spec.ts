import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQuoteRequestsComponent } from './new-quote-requests.component';

describe('NewQuoteRequestsComponent', () => {
  let component: NewQuoteRequestsComponent;
  let fixture: ComponentFixture<NewQuoteRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewQuoteRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewQuoteRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
