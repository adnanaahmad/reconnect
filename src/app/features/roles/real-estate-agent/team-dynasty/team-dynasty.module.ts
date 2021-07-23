import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamDynastyRoutingModule } from './team-dynasty-routing.module';
import { TeamDynastyComponent } from './components/team-dynasty/team-dynasty.component';
import {SharedModule} from '../../../../shared/shared.module';
import {MessageService} from 'primeng/api';


@NgModule({
  declarations: [TeamDynastyComponent],
  imports: [CommonModule, TeamDynastyRoutingModule, SharedModule ],
  providers: [MessageService]
})
export class TeamDynastyModule { }
