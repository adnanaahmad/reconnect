import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import {NavigationComponent} from './components/navigation/navigation.component';
import {NavigationService} from './service/navigation.service';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { HidePopupDirective } from './directive/hide-popup.directive';

@NgModule({
  declarations: [NavigationComponent, HeaderComponent, HidePopupDirective],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [NavigationService]
})
export class NavigationModule { }
