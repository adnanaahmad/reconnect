import {Component, Input, OnInit} from '@angular/core';
import {HelperService} from '../../../core/helper/helper.service';

@Component({
  selector: 'app-transaction-process',
  templateUrl: './transaction-process.component.html',
  styleUrls: ['./transaction-process.component.scss']
})
export class TransactionProcessComponent implements OnInit {
  @Input() transaction;
  constructor(public helper: HelperService) { }

  ngOnInit(): void {
    this.lockStatus('application', '', 'preApproved');
    this.lockStatus('preApproved', 'application', 'acceptedOffer');
    this.lockStatus('acceptedOffer', 'preApproved', 'underwriting');
    this.lockStatus('underwriting', 'acceptedOffer', 'approvedWithConditions');
    this.lockStatus('approvedWithConditions', 'underwriting', 'clearedToClose');
    this.lockStatus('clearedToClose', 'approvedWithConditions', 'closed');
    this.lockStatus('closed', 'clearedToClose');
  }
  lockStatus(current, previous, next?): void {
    if (previous){
      this.transaction.finance.get(['processStatus', current]).valueChanges.subscribe(res => {
        if (res === true && !this.transaction.finance.get(['processStatus', previous]).value){
          this.transaction.finance.get(['processStatus', current]).setValue(false);
        }
      });
    }
    if (next){
      this.transaction.finance.get(['processStatus', current]).valueChanges.subscribe(res => {
        if (res === false && this.transaction.finance.get(['processStatus', next]).value){
          this.transaction.finance.get(['processStatus', current]).setValue(true);
        }
      });
    }
  }
}
