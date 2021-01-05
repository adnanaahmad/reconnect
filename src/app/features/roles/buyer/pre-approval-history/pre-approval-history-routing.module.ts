import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PreApprovalHistoryComponent} from './components/pre-approval-history/pre-approval-history.component';


const routes: Routes = [{ path: '', component: PreApprovalHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreApprovalHistoryRoutingModule { }
