import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {SharedModule} from '../../../../shared/shared.module';
import { EditPartnersProfileComponent } from './components/edit-partners-profile/edit-partners-profile.component';
import { EditPersonalDetailsComponent } from './components/edit-personal-details/edit-personal-details.component';
import { EditCompanyDetailsComponent } from './components/edit-company-details/edit-company-details.component';


@NgModule({
  declarations: [ProfileComponent, EditProfileComponent, EditPartnersProfileComponent, EditPersonalDetailsComponent, EditCompanyDetailsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
