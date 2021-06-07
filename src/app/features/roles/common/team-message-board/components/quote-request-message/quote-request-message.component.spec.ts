import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteRequestMessageComponent } from './quote-request-message.component';

describe('QuoteRequestMessageComponent', () => {
  let component: QuoteRequestMessageComponent;
  let fixture: ComponentFixture<QuoteRequestMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteRequestMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteRequestMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
