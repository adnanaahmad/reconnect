import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-new-quote-requests',
  templateUrl: './new-quote-requests.component.html',
  styleUrls: ['./new-quote-requests.component.scss']
})
export class NewQuoteRequestsComponent implements OnInit {
  @Input() quoteRequest;
  constructor(public helper: HelperService) { }

  ngOnInit(): void {
  }
  //
  // quoteRequest(val): void{
  //   console.log('quoteRequest', val);
  // }

}
