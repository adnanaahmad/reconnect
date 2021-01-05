import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-quote-requests',
  templateUrl: './new-quote-requests.component.html',
  styleUrls: ['./new-quote-requests.component.scss']
})
export class NewQuoteRequestsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  quoteRequest(val): void{
    console.log('quoteRequest', val);
  }

}
