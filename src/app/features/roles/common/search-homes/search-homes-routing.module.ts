import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SearchHomesComponent} from './components/search-homes/search-homes.component';


const routes: Routes = [{ path: '', component: SearchHomesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchHomesRoutingModule { }
