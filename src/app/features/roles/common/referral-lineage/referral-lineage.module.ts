import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralLineageRoutingModule } from './referral-lineage-routing.module';
import {ReferralLineageComponent} from './components/referral-lineage/referral-lineage.component';


@NgModule({
  declarations: [ReferralLineageComponent],
  imports: [
    CommonModule,
    ReferralLineageRoutingModule,
  ]
})
export class ReferralLineageModule { }
