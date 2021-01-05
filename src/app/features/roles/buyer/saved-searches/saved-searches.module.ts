import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedSearchesRoutingModule } from './saved-searches-routing.module';
import {SavedSearchesComponent} from './components/saved-searches/saved-searches.component';
import { ThousandSuffixPipe } from './pipes/thousand-suffix.pipe';


@NgModule({
  declarations: [SavedSearchesComponent, ThousandSuffixPipe],
  imports: [
    CommonModule,
    SavedSearchesRoutingModule
  ]
})
export class SavedSearchesModule { }
