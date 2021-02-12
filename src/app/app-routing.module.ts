import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './features/landing/components/landing/landing.component';
import {AuthGuard} from './core/authGuard/auth.guard';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./features/navigation/navigation.module').then(m => m.NavigationModule),
        canLoad: [AuthGuard],
    },
    {
        path: '',
        loadChildren: () => import('./features/landing/landing.module').then(m => m.LandingModule)
    },
    // { path: '**',
    //   component: LandingComponent
    // }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
