import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMessageBoardRoutingModule } from './team-message-board-routing.module';
import {TeamMessageBoardComponent} from './components/team-message-board/team-message-board.component';
import {SharedModule} from '../../../../shared/shared.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { HighlightPipe } from './pipes/highlight.pipe';
import { CreateGroupChatComponent } from './popups/create-group-chat/create-group-chat.component';
import { QuoteRequestMessageComponent } from './components/quote-request-message/quote-request-message.component';


@NgModule({
  declarations: [TeamMessageBoardComponent, HighlightPipe, CreateGroupChatComponent, QuoteRequestMessageComponent],
  imports: [
    CommonModule,
    TeamMessageBoardRoutingModule,
    SharedModule,
    PickerModule
  ]
})
export class TeamMessageBoardModule { }
