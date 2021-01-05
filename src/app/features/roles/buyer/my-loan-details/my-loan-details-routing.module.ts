import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyLoanDetailsComponent} from './components/my-loan-details/my-loan-details.component';


const routes: Routes = [{ path: '', component: MyLoanDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyLoanDetailsRoutingModule { }
