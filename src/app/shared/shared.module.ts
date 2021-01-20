import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DeleteConfirmationPopupComponent } from './components/delete-confirmation-popup/delete-confirmation-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FhaComponent} from './components/fha/fha.component';
import {ConventionalComponent} from './components/conventional/conventional.component';
import {HomePossibleComponent} from './components/home-possible/home-possible.component';
import {HomeReadyComponent} from './components/home-ready/home-ready.component';
import {VaComponent} from './components/va/va.component';
import {UsdaComponent} from './components/usda/usda.component';
import {LoanCheckboxComponent} from './components/loan-checkbox/loan-checkbox.component';
import {SubjectPropertyComponent} from './components/subject-property/subject-property.component';
import {TransactionProcessComponent} from './components/transaction-process/transaction-process.component';
import {BuyerInfoComponent} from './components/buyer-info/buyer-info.component';
import { SubjectPropertyDetailsComponent } from './components/subject-property-details/subject-property-details.component';


@NgModule({
  declarations: [
    DeleteConfirmationPopupComponent,
    FhaComponent,
    ConventionalComponent,
    HomePossibleComponent,
    HomeReadyComponent,
    VaComponent,
    UsdaComponent,
    LoanCheckboxComponent,
    SubjectPropertyComponent,
    TransactionProcessComponent,
    BuyerInfoComponent,
    SubjectPropertyDetailsComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgxChartsModule,
    DeleteConfirmationPopupComponent,
    FhaComponent,
    ConventionalComponent,
    HomePossibleComponent,
    HomeReadyComponent,
    VaComponent,
    UsdaComponent,
    LoanCheckboxComponent,
    SubjectPropertyComponent,
    TransactionProcessComponent,
    BuyerInfoComponent,
    SubjectPropertyDetailsComponent,
  ],
})
export class SharedModule { }
