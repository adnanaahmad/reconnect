import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReferralLineageRoutingModule } from './referral-lineage-routing.module';
import {ReferralLineageComponent} from './components/referral-lineage/referral-lineage.component';

import { GraphComponentComponent } from './components/graph-component/graph-component.component';
import { NodeComponent } from './components/node/node.component';

@NgModule({
  entryComponents: [NodeComponent],
  declarations: [ReferralLineageComponent, GraphComponentComponent, NodeComponent],
  imports: [
    CommonModule,
    ReferralLineageRoutingModule,
  ]
})
export class ReferralLineageModule { }
