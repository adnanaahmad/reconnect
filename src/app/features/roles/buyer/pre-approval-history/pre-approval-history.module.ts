import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreApprovalHistoryRoutingModule } from './pre-approval-history-routing.module';
import {PreApprovalHistoryComponent} from './components/pre-approval-history/pre-approval-history.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [PreApprovalHistoryComponent],
  imports: [
      CommonModule,
      PreApprovalHistoryRoutingModule,
      SharedModule
  ]
})
export class PreApprovalHistoryModule { }
