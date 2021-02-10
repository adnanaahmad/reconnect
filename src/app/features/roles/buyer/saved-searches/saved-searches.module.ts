import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedSearchesRoutingModule } from './saved-searches-routing.module';
import {SavedSearchesComponent} from './components/saved-searches/saved-searches.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [SavedSearchesComponent, ],
  imports: [
      CommonModule,
      SavedSearchesRoutingModule,
      SharedModule
  ]
})
export class SavedSearchesModule { }
