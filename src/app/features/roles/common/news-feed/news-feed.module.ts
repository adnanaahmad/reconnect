import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsFeedRoutingModule } from './news-feed-routing.module';
import {NewsFeedComponent} from './components/news-feed/news-feed.component';
import { VariantOneComponent } from './components/variant-one/variant-one.component';
import { VariantTwoComponent } from './components/variant-two/variant-two.component';
import { VariantThreeComponent } from './components/variant-three/variant-three.component';
import { VariantFourComponent } from './components/variant-four/variant-four.component';
import { AddNewsFeedComponent } from './popups/add-news-feed/add-news-feed.component';
import {SharedModule} from '../../../../shared/shared.module';
import { AddExternalLinkComponent } from './popups/add-external-link/add-external-link.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';


@NgModule({
  declarations: [
      NewsFeedComponent,
      VariantOneComponent,
      VariantTwoComponent,
      VariantThreeComponent,
      VariantFourComponent,
      AddNewsFeedComponent,
      AddExternalLinkComponent,
      PublisherComponent
  ],
    imports: [
        CommonModule,
        NewsFeedRoutingModule,
        SharedModule,
        ShareButtonsModule.withConfig({
            debug: true
        }),
        ShareIconsModule,
        FontAwesomeModule,
    ]
})
export class NewsFeedModule { }
