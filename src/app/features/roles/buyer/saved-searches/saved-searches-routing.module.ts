import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SavedSearchesComponent} from './components/saved-searches/saved-searches.component';


const routes: Routes = [{ path: '', component: SavedSearchesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavedSearchesRoutingModule { }
