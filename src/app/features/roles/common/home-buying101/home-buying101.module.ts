import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeBuying101RoutingModule } from './home-buying101-routing.module';
import {HomeBuying101Component} from './components/home-buying101/home-buying101.component';


@NgModule({
  declarations: [HomeBuying101Component],
  imports: [
    CommonModule,
    HomeBuying101RoutingModule
  ]
})
export class HomeBuying101Module { }
