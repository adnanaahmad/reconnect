import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsComponent } from './components/terms/terms.component';
import {InterpretaionComponent} from './components/interpretaion/interpretaion.component';
import {AcknowledgementComponent} from './components/acknowledgement/acknowledgement.component';
import {UserAccountComponent} from './components/user-account/user-account.component';
import {ContentComponent} from './components/content/content.component';
import {ContentRestrictionComponent} from './components/content-restriction/content-restriction.component';
import {CopyrightComponent} from './components/copyright/copyright.component';
import {IntellectualPropertyComponent} from './components/intellectual-property/intellectual-property.component';
import {FeedbackComponent} from './components/feedback/feedback.component';
import {LinksComponent} from './components/links/links.component';
import {TerminationComponent} from './components/termination/termination.component';
import {LiabilityComponent} from './components/liability/liability.component';
import {DisclaimerComponent} from './components/disclaimer/disclaimer.component';
import {GoverningLawComponent} from './components/governing-law/governing-law.component';
import {DisputesComponent} from './components/disputes/disputes.component';
import {EuUserComponent} from './components/eu-user/eu-user.component';
import {LegalComplianceComponent} from './components/legal-compliance/legal-compliance.component';
import {WaiverComponent} from './components/waiver/waiver.component';
import {TranslationComponent} from './components/translation/translation.component';
import {ContactUsComponent} from './components/contact-us/contact-us.component';
import {TermsAndConditionsComponent} from './components/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
    {
      path: '',
      component: TermsComponent,
      children: [
        {
          path: 'interpretation',
          component: InterpretaionComponent
        },
        {
          path: 'acknowledgement',
          component: AcknowledgementComponent
        },
        {
          path: 'userAccounts',
          component: UserAccountComponent
        },
        {
          path: 'content',
          component: ContentComponent
        },
        {
          path: 'contentRestrictions',
          component: ContentRestrictionComponent
        },
        {
          path: 'copyrightPolicy',
          component: CopyrightComponent
        },
        {
          path: 'intellectualProperty',
          component: IntellectualPropertyComponent
        },
        {
          path: 'feedback',
          component: FeedbackComponent
        },
        {
          path: 'links',
          component: LinksComponent
        },
        {
          path: 'termination',
          component: TerminationComponent
        },
        {
          path: 'liability',
          component: LiabilityComponent
        },
        {
          path: 'disclaimer',
          component: DisclaimerComponent
        },
        {
          path: 'governingLaw',
          component: GoverningLawComponent
        },
        {
          path: 'disputesResolution',
          component: DisputesComponent
        },
        {
          path: 'eu',
          component: EuUserComponent
        },
        {
          path: 'legalCompliance',
          component: LegalComplianceComponent
        },
        {
          path: 'waiver',
          component: WaiverComponent
        },
        {
          path: 'translation',
          component: TranslationComponent
        },
        {
          path: 'termsAndConditions',
          component: TermsAndConditionsComponent
        },
        {
          path: 'contactUs',
          component: ContactUsComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsRoutingModule { }
