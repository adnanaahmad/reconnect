import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeBuying101Component} from './components/home-buying101/home-buying101.component';


const routes: Routes = [{ path: '', component: HomeBuying101Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeBuying101RoutingModule { }
