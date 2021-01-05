import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionalDirectoryRoutingModule } from './professional-directory-routing.module';
import {ProfessionalDirectoryComponent} from './components/professional-directory/professional-directory.component';
import {SharedModule} from '../../../../shared/shared.module';


@NgModule({
  declarations: [ProfessionalDirectoryComponent],
  imports: [
    CommonModule,
    ProfessionalDirectoryRoutingModule,
    SharedModule
  ]
})
export class ProfessionalDirectoryModule { }
