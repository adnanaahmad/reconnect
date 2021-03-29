import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeBuyingDashboardRoutingModule } from './home-buying-dashboard-routing.module';
import {HomeBuyingDashboardComponent} from './component/home-buying-dashboard/home-buying-dashboard.component';
import { TeamPersonComponent } from './component/team-person/team-person.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [HomeBuyingDashboardComponent, TeamPersonComponent],
  imports: [
    CommonModule,
    HomeBuyingDashboardRoutingModule,
    SharedModule,
  ]
})
export class HomeBuyingDashboardModule { }
