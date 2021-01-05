import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuoteRequestsComponent} from './components/quote-requests/quote-requests.component';


const routes: Routes = [{ path: '', component: QuoteRequestsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRequestsRoutingModule { }
