import { Component, OnInit } from '@angular/core';
import {PreApprovalHistoryService} from '../../services/pre-approval-history.service';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {take} from 'rxjs/operators';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
  selector: 'app-pre-approval-history',
  templateUrl: './pre-approval-history.component.html',
  styleUrls: ['./pre-approval-history.component.scss']
})
export class PreApprovalHistoryComponent implements OnInit {
  preApprovalHistoryList: Array<any>;
  constructor(private historyService: PreApprovalHistoryService,
              private helper: HelperService,
              public store: StoreService) { }

  ngOnInit(): void {
    this.getHistory();
  }
  getHistory(): void{
    this.store.updateProgressBarLoading(true);
    this.historyService.getHistory().pipe(take(1)).subscribe(res => {
      this.preApprovalHistoryList = res.result;
      this.store.updateProgressBarLoading(false);
    }, error => {
      this.helper.handleApiError(error, 'Failed to fetch history');
      this.store.updateProgressBarLoading(false);
    });
  }
}
