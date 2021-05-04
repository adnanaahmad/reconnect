import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationBuyerComponent} from './components/registration-buyer/registration-buyer.component';
import {RegistrationPartnerComponent} from './components/registration-partner/registration-partner.component';
import {SetPasswordComponent} from './components/set-password/set-password.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';
import {BuyHomeComponent} from './components/buy-home/buy-home.component';
import {SellHomeComponent} from './components/sell-home/sell-home.component';
import {BecomeAgentComponent} from './components/become-agent/become-agent.component';


const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegistrationBuyerComponent
            },
            {
                path: 'registerPartner',
                component: RegistrationPartnerComponent
            },
            {
                path: 'setPassword',
                component: SetPasswordComponent
            },
            {
                path: 'forgotPassword',
                component: ForgotPasswordComponent
            },
            {
                path: 'homePage',
                component: HomeComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'buyHome',
                component: BuyHomeComponent
            },
            {
                path: 'sellHome',
                component: SellHomeComponent
            },
            {
                path: 'becomeAgent',
                component: BecomeAgentComponent
            },
      ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
