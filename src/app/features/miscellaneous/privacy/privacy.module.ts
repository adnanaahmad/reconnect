import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyRoutingModule } from './privacy-routing.module';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { DefinitionComponent } from './components/definition/definition.component';
import { UsingPersonalDataComponent } from './components/using-personal-data/using-personal-data.component';
import { ProcessingPersonalDataComponent } from './components/processing-personal-data/processing-personal-data.component';
import { CcpaComponent } from './components/ccpa/ccpa.component';
import { ChildrenComponent } from './components/children/children.component';
import { CaliforniaRightsComponent } from './components/california-rights/california-rights.component';
import { CaliforniaRightsMinorUsersComponent } from './components/california-rights-minor-users/california-rights-minor-users.component';
import { LinksComponent } from './components/links/links.component';
import { PolicyComponent } from './components/policy/policy.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import {SharedModule} from '../../../shared/shared.module';
import { PrivacyProtectionActComponent } from './components/privacy-protection-act/privacy-protection-act.component';


@NgModule({
  declarations: [PrivacyComponent, DefinitionComponent, UsingPersonalDataComponent, ProcessingPersonalDataComponent, CcpaComponent, ChildrenComponent, CaliforniaRightsComponent, CaliforniaRightsMinorUsersComponent, LinksComponent, PolicyComponent, ContactUsComponent, PrivacyProtectionActComponent],
    imports: [
        CommonModule,
        PrivacyRoutingModule,
        SharedModule,
    ]
})
export class PrivacyModule { }
