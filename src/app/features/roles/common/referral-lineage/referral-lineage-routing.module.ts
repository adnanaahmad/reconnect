import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReferralLineageComponent} from './components/referral-lineage/referral-lineage.component';


const routes: Routes = [{ path: '', component: ReferralLineageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralLineageRoutingModule { }
