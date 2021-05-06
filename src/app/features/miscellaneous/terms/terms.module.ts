import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './components/terms/terms.component';
import { InterpretaionComponent } from './components/interpretaion/interpretaion.component';
import { AcknowledgementComponent } from './components/acknowledgement/acknowledgement.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ContentComponent } from './components/content/content.component';
import { ContentRestrictionComponent } from './components/content-restriction/content-restriction.component';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { IntellectualPropertyComponent } from './components/intellectual-property/intellectual-property.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LinksComponent } from './components/links/links.component';
import { TerminationComponent } from './components/termination/termination.component';
import { LiabilityComponent } from './components/liability/liability.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { GoverningLawComponent } from './components/governing-law/governing-law.component';
import { DisputesComponent } from './components/disputes/disputes.component';
import { EuUserComponent } from './components/eu-user/eu-user.component';
import { LegalComplianceComponent } from './components/legal-compliance/legal-compliance.component';
import { WaiverComponent } from './components/waiver/waiver.component';
import { TranslationComponent } from './components/translation/translation.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [TermsComponent, InterpretaionComponent, AcknowledgementComponent, UserAccountComponent, ContentComponent, ContentRestrictionComponent, CopyrightComponent, IntellectualPropertyComponent, FeedbackComponent, LinksComponent, TerminationComponent, LiabilityComponent, DisclaimerComponent, GoverningLawComponent, DisputesComponent, EuUserComponent, LegalComplianceComponent, WaiverComponent, TranslationComponent, TermsAndConditionsComponent, ContactUsComponent],
    imports: [
        CommonModule,
        TermsRoutingModule,
        SharedModule
    ]
})
export class TermsModule { }
