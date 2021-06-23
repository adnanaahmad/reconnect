import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreApprovalLetterRoutingModule } from './pre-approval-letter-routing.module';
import {PreApprovalLetterComponent} from './components/pre-approval-letter/pre-approval-letter.component';
import { TemplateListComponent } from './components/template-list/template-list.component';
import { TemplateComponent } from './components/template/template.component';
import { CreateTemplateComponent } from './popups/create-template/create-template.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [
      PreApprovalLetterComponent,
    TemplateListComponent,
    TemplateComponent,
    CreateTemplateComponent
  ],
  imports: [
      CommonModule,
      PreApprovalLetterRoutingModule,
      SharedModule
  ]
})
export class PreApprovalLetterModule { }
