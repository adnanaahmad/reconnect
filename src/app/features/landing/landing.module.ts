import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import {LandingComponent} from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationBuyerComponent } from './components/registration-buyer/registration-buyer.component';
import {RegistrationPartnerComponent} from './components/registration-partner/registration-partner.component';
import {SharedModule} from '../../shared/shared.module';
import {LocationService} from './services/location/location.service';


@NgModule({
  declarations: [LandingComponent, LoginComponent, RegistrationPartnerComponent, RegistrationBuyerComponent],
  imports: [
      CommonModule,
      LandingRoutingModule,
      SharedModule
  ],
    providers:[LocationService]
})
export class LandingModule { }
