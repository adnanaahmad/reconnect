import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path: '',
  //   loadChildren: () => import('./features/login-registration/login-registration.module').then(m => m.LoginRegistrationModule)
  // },
  { path: 'home',
    loadChildren: () => import('./features/navigation/navigation.module').then(m => m.NavigationModule)
  },
  { path: '', loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
