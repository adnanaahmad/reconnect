import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsFeedRoutingModule } from './news-feed-routing.module';
import {NewsFeedComponent} from './components/news-feed/news-feed.component';


@NgModule({
  declarations: [NewsFeedComponent],
  imports: [
    CommonModule,
    NewsFeedRoutingModule,
  ]
})
export class NewsFeedModule { }
