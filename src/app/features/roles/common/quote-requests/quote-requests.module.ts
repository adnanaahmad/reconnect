import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { QuoteRequestsRoutingModule } from './quote-requests-routing.module';
import {QuoteRequestsComponent} from './components/quote-requests/quote-requests.component';
import {SharedModule} from '../../../../shared/shared.module';
import {NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [QuoteRequestsComponent],
  imports: [
    CommonModule,
    QuoteRequestsRoutingModule,
    SharedModule
  ],
  providers: [NgbDateNativeAdapter, DatePipe]
})
export class QuoteRequestsModule { }
