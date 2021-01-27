import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {SharedModule} from '../../../../shared/shared.module';
import { EditPartnersProfileComponent } from './components/edit-partners-profile/edit-partners-profile.component';
import { EditPersonalDetailsComponent } from './components/edit-personal-details/edit-personal-details.component';
import { EditCompanyDetailsComponent } from './components/edit-company-details/edit-company-details.component';
import { ViewBuyerProfileComponent } from './components/view-buyer-profile/view-buyer-profile.component';
import { ViewPartnersProfileComponent } from './components/view-partners-profile/view-partners-profile.component';
import {LocationService} from '../../../landing/services/location/location.service';


@NgModule({
  declarations: [ProfileComponent, EditProfileComponent, EditPartnersProfileComponent, EditPersonalDetailsComponent, EditCompanyDetailsComponent, ViewBuyerProfileComponent, ViewPartnersProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  providers: [LocationService, DatePipe]
})
export class ProfileModule { }
