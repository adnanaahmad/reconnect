import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {DeleteConfirmationPopupComponent} from './components/delete-confirmation-popup/delete-confirmation-popup.component';
import {NgbDateNativeAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FhaComponent} from './components/fha/fha.component';
import {ConventionalComponent} from './components/conventional/conventional.component';
import {HomePossibleComponent} from './components/home-possible/home-possible.component';
import {HomeReadyComponent} from './components/home-ready/home-ready.component';
import {VaComponent} from './components/va/va.component';
import {UsdaComponent} from './components/usda/usda.component';
import {LoanCheckboxComponent} from './components/loan-checkbox/loan-checkbox.component';
import {SubjectPropertyComponent} from './components/subject-property/subject-property.component';
import {TransactionProcessComponent} from './components/transaction-process/transaction-process.component';
import {BuyerInfoComponent} from './components/buyer-info/buyer-info.component';
import {SubjectPropertyDetailsComponent} from './components/subject-property-details/subject-property-details.component';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {ThousandSuffixPipe} from './pipes/thousand-suffix.pipe';
import {SplitCamelCasePipe} from './pipes/splitCamelCase/split-camel-case.pipe';
import {SubjectPropertyTemplateComponent} from './components/subject-property-template/subject-property-template.component';
import {ReversePipe} from './pipes/reverse/reverse.pipe';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {AddMemberComponent} from './components/add-member/add-member.component';
import { NoResultsFoundComponent } from './components/no-results-found/no-results-found.component';
import {DomChangesDirective} from './directives/dom-changes/dom-changes.directive';
import {AddClosingCostComponent} from './components/add-closing-cost/add-closing-cost.component';
import {RemoveMemberComponent} from './components/remove-member/remove-member.component';
import {CreateEventComponent} from './components/create-event/create-event.component';
import { LandingPageCardComponent } from './components/landing-page-card/landing-page-card.component';
import { LandingSideNavComponent } from './components/landing-side-nav/landing-side-nav.component';
import {RouterModule} from '@angular/router';
import { SafeUrlPipe } from './pipes/safeUrl/safe-url.pipe';
import {DatePickerComponent} from './components/date-picker/date-picker.component';
import { ComplianceInfoComponent } from './components/compliance-info/compliance-info.component';
import { InviteUserComponent } from './components/invite-user/invite-user.component';

const maskConfig: Partial<IConfig> = {
    validation: false,
};

@NgModule({
    declarations: [
        AddMemberComponent,
        DeleteConfirmationPopupComponent,
        FhaComponent,
        ConventionalComponent,
        HomePossibleComponent,
        HomeReadyComponent,
        VaComponent,
        UsdaComponent,
        LoanCheckboxComponent,
        SubjectPropertyComponent,
        TransactionProcessComponent,
        BuyerInfoComponent,
        SubjectPropertyDetailsComponent,
        ThousandSuffixPipe,
        SplitCamelCasePipe,
        SubjectPropertyTemplateComponent,
        ReversePipe,
        NoResultsFoundComponent,
        DomChangesDirective,
        AddClosingCostComponent,
        RemoveMemberComponent,
        CreateEventComponent,
        LandingPageCardComponent,
        LandingSideNavComponent,
        SafeUrlPipe,
        DatePickerComponent,
        ComplianceInfoComponent,
        InviteUserComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(maskConfig),
        Ng2SearchPipeModule,
        NgbModule,
        RouterModule
    ],
    exports: [
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        NgbModule,
        NgxChartsModule,
        NgxMaskModule,
        DeleteConfirmationPopupComponent,
        FhaComponent,
        ConventionalComponent,
        HomePossibleComponent,
        HomeReadyComponent,
        VaComponent,
        UsdaComponent,
        LoanCheckboxComponent,
        SubjectPropertyComponent,
        TransactionProcessComponent,
        BuyerInfoComponent,
        SubjectPropertyDetailsComponent,
        ThousandSuffixPipe,
        SplitCamelCasePipe,
        ReversePipe,
        SubjectPropertyTemplateComponent,
        Ng2SearchPipeModule,
        AddMemberComponent,
        NoResultsFoundComponent,
        DomChangesDirective,
        AddClosingCostComponent,
        RemoveMemberComponent,
        CreateEventComponent,
        LandingPageCardComponent,
        LandingSideNavComponent,
        LandingSideNavComponent,
        SafeUrlPipe,
        DatePickerComponent,
        ComplianceInfoComponent,
        InviteUserComponent
    ],
    providers: [NgbDateNativeAdapter]
})
export class SharedModule {
}
