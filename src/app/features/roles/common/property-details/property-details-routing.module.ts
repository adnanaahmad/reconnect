import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PropertyDetailsComponent} from './components/property-details/property-details.component';


const routes: Routes = [{ path: '', component: PropertyDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertyDetailsRoutingModule { }
