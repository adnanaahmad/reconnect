import { NgModule } from '@angular/core';
import {CommonModule, DatePipe, TitleCasePipe} from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import {ProfileComponent} from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {SharedModule} from '../../../../shared/shared.module';
import { EditPartnersProfileComponent } from './components/edit-partners-profile/edit-partners-profile.component';
import { EditPersonalDetailsComponent } from './components/edit-personal-details/edit-personal-details.component';
import { EditCompanyDetailsComponent } from './components/edit-company-details/edit-company-details.component';
import { ViewBuyerProfileComponent } from './components/view-buyer-profile/view-buyer-profile.component';
import { ViewPartnersProfileComponent } from './components/view-partners-profile/view-partners-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { ChangeEmailComponent } from './popus/change-email/change-email.component';


@NgModule({
  declarations: [ProfileComponent, EditProfileComponent, EditPartnersProfileComponent, EditPersonalDetailsComponent, EditCompanyDetailsComponent, ViewBuyerProfileComponent, ViewPartnersProfileComponent, ViewProfileComponent, ChangeEmailComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ],
  providers: [ DatePipe, TitleCasePipe]
})
export class ProfileModule { }
