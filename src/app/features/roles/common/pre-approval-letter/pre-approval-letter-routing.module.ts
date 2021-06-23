import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PreApprovalLetterComponent} from './components/pre-approval-letter/pre-approval-letter.component';


const routes: Routes = [{ path: '', component: PreApprovalLetterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreApprovalLetterRoutingModule { }
