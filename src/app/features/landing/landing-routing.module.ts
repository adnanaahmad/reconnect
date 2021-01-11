import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './components/landing/landing.component';


const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
        children: [
        { path: 'user',
          loadChildren: () => import('../../features/login-registration/login-registration.module').then(m => m.LoginRegistrationModule)
        }
      ],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
