import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NewsFeedComponent} from './components/news-feed/news-feed.component';


const routes: Routes = [{ path: '', component: NewsFeedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsFeedRoutingModule { }
