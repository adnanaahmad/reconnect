import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationBuyerComponent} from './components/registration-buyer/registration-buyer.component';
import {RegistrationPartnerComponent} from './components/registration-partner/registration-partner.component';


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
            }
      ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
