import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './components/profile/profile.component';
import {EditProfileComponent} from './components/edit-profile/edit-profile.component';
import {EditPartnersProfileComponent} from './components/edit-partners-profile/edit-partners-profile.component';
import {EditPersonalDetailsComponent} from './components/edit-personal-details/edit-personal-details.component';
import {EditCompanyDetailsComponent} from './components/edit-company-details/edit-company-details.component';
import {ViewProfileComponent} from './components/view-profile/view-profile.component';


const routes: Routes = [
    {path: '', component: ProfileComponent },
    {path: 'editDetails', component: EditProfileComponent },
    {path: 'viewProfile/:id', component: ViewProfileComponent },
    {
      path: 'edit',
      component: EditPartnersProfileComponent,
      children: [
        {path: 'personalDetails', component: EditPersonalDetailsComponent},
        {path: 'companyDetails', component: EditCompanyDetailsComponent},
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
