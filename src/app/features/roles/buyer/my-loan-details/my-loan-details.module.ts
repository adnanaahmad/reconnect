import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyLoanDetailsRoutingModule } from './my-loan-details-routing.module';
import {MyLoanDetailsComponent} from './components/my-loan-details/my-loan-details.component';
import {SharedModule} from 'src/app/shared/shared.module';
import { AddClosingCostComponent } from './popups/add-closing-cost/add-closing-cost.component';



@NgModule({
  declarations: [MyLoanDetailsComponent, AddClosingCostComponent],
  imports: [
    CommonModule,
    MyLoanDetailsRoutingModule,
    SharedModule
  ]
})
export class MyLoanDetailsModule { }
