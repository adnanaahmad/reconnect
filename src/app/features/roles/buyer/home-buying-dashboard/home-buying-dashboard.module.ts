import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeBuyingDashboardRoutingModule } from './home-buying-dashboard-routing.module';
import {HomeBuyingDashboardComponent} from './component/home-buying-dashboard/home-buying-dashboard.component';
import { RemoveMemberComponent } from './popups/remove-member/remove-member.component';
import { TeamPersonComponent } from './component/team-person/team-person.component';
import {SharedModule} from '../../../../shared/shared.module';
import { AddMemberComponent } from './popups/add-member/add-member.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [HomeBuyingDashboardComponent, RemoveMemberComponent, TeamPersonComponent, AddMemberComponent],
  imports: [
    CommonModule,
    HomeBuyingDashboardRoutingModule,
    SharedModule,
    Ng2SearchPipeModule
  ]
})
export class HomeBuyingDashboardModule { }
