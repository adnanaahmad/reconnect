import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteRequestsComponent } from './quote-requests.component';

describe('QuoteRequestsComponent', () => {
  let component: QuoteRequestsComponent;
  let fixture: ComponentFixture<QuoteRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
