import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchHomesRoutingModule } from './search-homes-routing.module';
import {SearchHomesComponent} from './components/search-homes/search-homes.component';
import {SharedModule} from '../../../../shared/shared.module';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { MoreFiltersComponent } from './components/more-filters/more-filters.component';


@NgModule({
  declarations: [SearchHomesComponent, HomeCardComponent, MoreFiltersComponent],
  imports: [
    CommonModule,
    SearchHomesRoutingModule,
    SharedModule
  ]
})
export class SearchHomesModule { }
