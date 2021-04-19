import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarRoutingModule } from './calendar-routing.module';
import {CalendarComponent} from './components/calendar/calendar.component';
import { NgbDateNativeAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../../../../shared/shared.module';
import { ViewEventComponent } from './popups/view-event/view-event.component';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [CalendarComponent, ViewEventComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    NgbModule,
    SharedModule
  ],
  providers: [NgbDateNativeAdapter]
})
export class CalendarModule { }
