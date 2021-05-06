import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyComponent } from './components/privacy/privacy.component';
import {DefinitionComponent} from './components/definition/definition.component';
import {UsingPersonalDataComponent} from './components/using-personal-data/using-personal-data.component';
import {ProcessingPersonalDataComponent} from './components/processing-personal-data/processing-personal-data.component';
import {CcpaComponent} from './components/ccpa/ccpa.component';
import {ChildrenComponent} from './components/children/children.component';
import {CaliforniaRightsComponent} from './components/california-rights/california-rights.component';
import {CaliforniaRightsMinorUsersComponent} from './components/california-rights-minor-users/california-rights-minor-users.component';
import {LinksComponent} from './components/links/links.component';
import {PolicyComponent} from './components/policy/policy.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {PrivacyProtectionActComponent} from './components/privacy-protection-act/privacy-protection-act.component';

const routes: Routes = [
    { path: '',
      component: PrivacyComponent,
      children: [
        {
          path: 'interpretation',
          component: DefinitionComponent
        },
        {
          path: 'usingPersonalData',
          component: UsingPersonalDataComponent
        },
        {
          path: 'processingPersonalData',
          component: ProcessingPersonalDataComponent
        },
        {
          path: 'ccpa',
          component: CcpaComponent
        },
        {
          path: 'children',
          component: ChildrenComponent
        },
        {
          path: 'californiaRights',
          component: CaliforniaRightsComponent
        },
        {
          path: 'minorUsers',
          component: CaliforniaRightsMinorUsersComponent
        },
        {
          path: 'links',
          component: LinksComponent
        },
        {
          path: 'policy',
          component: PolicyComponent
        },
        {
          path: 'contactUs',
          component: ContactUsComponent
        },
        {
          path: 'privacyProtectionAct',
          component: PrivacyProtectionActComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivacyRoutingModule { }
