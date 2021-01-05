import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TeamMessageBoardComponent} from './components/team-message-board/team-message-board.component';


const routes: Routes = [{ path: '', component: TeamMessageBoardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMessageBoardRoutingModule { }
