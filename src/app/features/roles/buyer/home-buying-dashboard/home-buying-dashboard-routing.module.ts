import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeBuyingDashboardComponent} from './component/home-buying-dashboard/home-buying-dashboard.component';


const routes: Routes = [{ path: '', component: HomeBuyingDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeBuyingDashboardRoutingModule { }
