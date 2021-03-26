import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowersRoutingModule } from './borrowers-routing.module';
import {BorrowersComponent} from './components/borrowers/borrowers.component';
import {SharedModule} from '../../../../shared/shared.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { AddNewBorrowerComponent } from './popups/add-new-borrower/add-new-borrower.component';


@NgModule({
  declarations: [BorrowersComponent, AddNewBorrowerComponent],
  imports: [
    CommonModule,
    BorrowersRoutingModule,
    SharedModule,
    Ng2SearchPipeModule
  ]
})
export class BorrowersModule { }
