import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralLineageRoutingModule } from './referral-lineage-routing.module';
import {ReferralLineageComponent} from './components/referral-lineage/referral-lineage.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [ReferralLineageComponent],
  imports: [
      CommonModule,
      ReferralLineageRoutingModule,
      SharedModule
  ]
})
export class ReferralLineageModule { }
