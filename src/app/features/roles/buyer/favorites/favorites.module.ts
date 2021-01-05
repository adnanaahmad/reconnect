import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import {FavoritesComponent} from './components/favorites/favorites.component';
import {HomeCardComponent} from './components/home-card/home-card.component';


@NgModule({
  declarations: [FavoritesComponent, HomeCardComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
