import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendQuoteRequestComponent } from './send-quote-request.component';

describe('SendQuoteRequestComponent', () => {
  let component: SendQuoteRequestComponent;
  let fixture: ComponentFixture<SendQuoteRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendQuoteRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendQuoteRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
