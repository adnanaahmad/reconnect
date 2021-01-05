import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BorrowersComponent} from './components/borrowers/borrowers.component';


const routes: Routes = [{ path: '', component: BorrowersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BorrowersRoutingModule { }
