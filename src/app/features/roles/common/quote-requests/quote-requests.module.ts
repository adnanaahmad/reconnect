import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRequestsRoutingModule } from './quote-requests-routing.module';
import {QuoteRequestsComponent} from './components/quote-requests/quote-requests.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [QuoteRequestsComponent],
  imports: [
    CommonModule,
    QuoteRequestsRoutingModule,
    SharedModule
  ]
})
export class QuoteRequestsModule { }
