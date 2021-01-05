import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SharedModule} from '../../../../shared/shared.module';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { BorrowersDatesComponent } from './components/borrowers-dates/borrowers-dates.component';
import { PersonalSalesComponent } from './components/personal-sales/personal-sales.component';
import { CommissionsEarnedComponent } from './components/commissions-earned/commissions-earned.component';
import { NewQuoteRequestsComponent } from './components/new-quote-requests/new-quote-requests.component';

@NgModule({
  declarations: [DashboardComponent, DatePickerComponent, BorrowersDatesComponent, PersonalSalesComponent, CommissionsEarnedComponent, NewQuoteRequestsComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
