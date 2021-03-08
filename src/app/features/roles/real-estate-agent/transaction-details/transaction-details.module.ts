import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionDetailsRoutingModule } from './transaction-details-routing.module';
import {TransactionDetailsComponent} from './components/transaction-details/transaction-details.component';
import {SharedModule} from '../../../../shared/shared.module';
import { AddPropertyMlsComponent } from './popups/add-property-mls/add-property-mls.component';
import {NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [TransactionDetailsComponent, AddPropertyMlsComponent],
  imports: [
    CommonModule,
    TransactionDetailsRoutingModule,
    SharedModule
  ],
  providers: [NgbDateNativeAdapter]
})
export class TransactionDetailsModule { }
