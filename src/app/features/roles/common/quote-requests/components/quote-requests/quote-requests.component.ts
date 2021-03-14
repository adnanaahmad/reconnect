import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {QuoteRequestsModel} from '../../models/quote-requests.model';
import {NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {QuoteRequestService} from '../../services/quote-request.service';
import {take} from 'rxjs/operators';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
  selector: 'app-quote-requests',
  templateUrl: './quote-requests.component.html',
  styleUrls: ['./quote-requests.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class QuoteRequestsComponent implements OnInit {
  quoteRequests: QuoteRequestsModel = {} as QuoteRequestsModel;
  date: any;
  constructor(private dateFormat: NgbDateNativeAdapter,
              private quoteReqService: QuoteRequestService,
              public constant: ConstantService,
              public helper: HelperService,
              private store: StoreService) { }

  ngOnInit(): void {
    this.quoteRequests.selectedButton = this.constant.quoteRequestStatus.PENDING;
    this.store.updateProgressBarLoading(true);
    this.quoteReqService.getQuoteRequest().pipe(take(1)).subscribe(res => {
      console.log(res);
      this.quoteRequests.pending = res.result.pendingQuotes;
      this.quoteRequests.accepted = res.result.acceptedQuotes;
      this.quoteRequests.rejected = res.result.rejectedQuotes;
      this.quoteRequests.renderArray = this.quoteRequests.pending;
      this.store.updateProgressBarLoading(false);
    }, error => {
      console.log(error);
      this.store.updateProgressBarLoading(false);
    });
  }

  listClick(value): void{
    this.quoteRequests.selectedButton = value;
    switch (value) {
      case this.constant.quoteRequestStatus.PENDING:
        this.quoteRequests.renderArray = this.quoteRequests.pending;
        break;
      case this.constant.quoteRequestStatus.ACCEPTED:
        this.quoteRequests.renderArray = this.quoteRequests.accepted;
        break;
      case this.constant.quoteRequestStatus.REJECTED:
        this.quoteRequests.renderArray = this.quoteRequests.rejected;
        break;
      default:
        this.quoteRequests.renderArray = this.quoteRequests.pending;
    }

  }
  dateView(result){
    console.log(result);
    const date = new DatePipe('en-US').transform(this.dateFormat.toModel(result), 'yyyy-MM-dd');
    return date;
  }
  acceptRequest(id): void{
    this.quoteReqService.acceptQuoteRequest({buyerId: id}).pipe(take(1)).subscribe(res => {
      //console.log(res);
      this.quoteRequests.pending = res.result.pendingQuotes;
      this.quoteRequests.accepted = res.result.acceptedQuotes;
      this.quoteRequests.rejected = res.result.rejectedQuotes;
      this.quoteRequests.renderArray = this.quoteRequests.pending;
    }, error => {
      console.log(error);
    });
  }
  rejectRequest(id): void{
    this.quoteReqService.rejectQuoteRequest({buyerId: id}).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.quoteRequests.pending = res.result.pendingQuotes;
      this.quoteRequests.accepted = res.result.acceptedQuotes;
      this.quoteRequests.rejected = res.result.rejectedQuotes;
      this.quoteRequests.renderArray = this.quoteRequests.pending;
    }, error => {
      console.log(error);
    });
  }
}
