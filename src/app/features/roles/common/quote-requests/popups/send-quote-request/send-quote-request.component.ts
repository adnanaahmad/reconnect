import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {NgbActiveModal, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuoteRequestService} from '../../services/quote-request.service';
import {take} from 'rxjs/operators';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-send-quote-request',
  templateUrl: './send-quote-request.component.html',
  styleUrls: ['./send-quote-request.component.scss']
})
export class SendQuoteRequestComponent implements OnInit {
  @Input() property: any;
  @Input() userId: string;
  quoteRequest: FormGroup;
  constructor(private helper: HelperService,
              private activeModal: NgbActiveModal,
              private fb: FormBuilder,
              private quoteService: QuoteRequestService,
              private constant: ConstantService,
              private router: Router,
              private dateFormat: NgbDateNativeAdapter) { }

  ngOnInit(): void {
    console.log(this.property);
    this.helper.setModalPosition();
    this.quoteRequest = this.fb.group({
      date: [null, Validators.required],
      fee: [null, Validators.required],
      description: [this.property.description],
      price: [this.property.listPrice],
      image: [this.property.images[0]],
      time: [null, [Validators.required, Validators.pattern('^([0-1][0-9]|[2][0-3])([0-5][0-9])$')]],
      status: [this.constant.quoteRequestStatus.PENDING]
    });
  }
  close(): void{
    this.activeModal.close({status: 'no'});
  }
  onSubmit(): void{
    if (this.quoteRequest.valid){
      const data = {
        to: [this.userId],
        quoteMeta: {...this.quoteRequest.value, date: new Date(new DatePipe('en-US').transform(
              this.dateFormat.toModel(this.quoteRequest.get('date').value), 'yyyy-MM-dd')).toISOString() },
        type: this.constant.chatMessageType.MESSAGE_TYPE_QUOTE
      };
      this.quoteService.sendQuoteRequest(data).pipe(take(1)).subscribe(res => {
        this.chatWithProfessional(this.userId);
      }, error => {
        this.helper.handleApiError(error, 'Failed to send quote');
      });
    } else {
      this.quoteRequest.markAllAsTouched();
    }
  }
  chatWithProfessional(id: string): void{
    this.router.navigateByUrl(`/home/teamMessageBoard?professional=${id}`).then();
  }
}
