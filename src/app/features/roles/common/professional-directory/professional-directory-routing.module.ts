import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfessionalDirectoryComponent} from './components/professional-directory/professional-directory.component';


const routes: Routes = [{ path: '', component: ProfessionalDirectoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalDirectoryRoutingModule { }
