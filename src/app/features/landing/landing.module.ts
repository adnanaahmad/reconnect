import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import {LandingComponent} from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationBuyerComponent } from './components/registration-buyer/registration-buyer.component';
import {RegistrationPartnerComponent} from './components/registration-partner/registration-partner.component';
import {SharedModule} from '../../shared/shared.module';
import {LocationService} from './services/location/location.service';
import { SetPasswordComponent } from './components/set-password/set-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [LandingComponent, LoginComponent, RegistrationPartnerComponent, RegistrationBuyerComponent, SetPasswordComponent, ForgotPasswordComponent],
  imports: [
      CommonModule,
      LandingRoutingModule,
      SharedModule
  ],
    providers: [LocationService]
})
export class LandingModule { }
