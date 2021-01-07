import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarRoutingModule } from './calendar-routing.module';
import {CalendarComponent} from './components/calendar/calendar.component';
import { NgbDateNativeAdapter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CreateEventComponent } from './popups/create-event/create-event.component';
import {SharedModule} from '../../../../shared/shared.module';
import {CoreModule} from '../../../../core/core.module';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  timeGridPlugin,
]);

@NgModule({
  declarations: [CalendarComponent, CreateEventComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FullCalendarModule,
    NgbModule,
    CoreModule,
    SharedModule
  ],
  providers: [NgbDateNativeAdapter]
})
export class CalendarModule { }
