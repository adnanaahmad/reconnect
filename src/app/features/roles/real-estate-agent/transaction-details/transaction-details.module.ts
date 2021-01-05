import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionDetailsRoutingModule } from './transaction-details-routing.module';
import {TransactionDetailsComponent} from './components/transaction-details/transaction-details.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [TransactionDetailsComponent],
  imports: [
    CommonModule,
    TransactionDetailsRoutingModule,
    SharedModule
  ]
})
export class TransactionDetailsModule { }
