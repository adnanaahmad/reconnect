import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LandingRoutingModule} from './landing-routing.module';
import {LandingComponent} from './components/landing/landing.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationBuyerComponent} from './components/registration-buyer/registration-buyer.component';
import {RegistrationPartnerComponent} from './components/registration-partner/registration-partner.component';
import {SharedModule} from '../../shared/shared.module';
import {SetPasswordComponent} from './components/set-password/set-password.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import { HomeComponent } from '../miscellaneous/home/home.component';
import { AboutComponent } from '../miscellaneous/about/about.component';
import { BuyHomeComponent } from '../miscellaneous/buy-home/buy-home.component';
import { SellHomeComponent } from '../miscellaneous/sell-home/sell-home.component';
import { BecomeAgentComponent } from '../miscellaneous/become-agent/become-agent.component';


@NgModule({
    declarations: [
        LandingComponent,
        LoginComponent,
        RegistrationPartnerComponent,
        RegistrationBuyerComponent,
        SetPasswordComponent,
        ForgotPasswordComponent,
        HomeComponent,
        AboutComponent,
        BuyHomeComponent,
        SellHomeComponent,
        BecomeAgentComponent
    ],
    imports: [
        CommonModule,
        LandingRoutingModule,
        SharedModule
    ]
})
export class LandingModule {
}
