import { CalendarOptions, EventApi } from '@fullcalendar/angular';
import {Subscription} from 'rxjs';

export interface CalendarModel {
  eventCategories: Array<any>;
  currentEvents: EventApi[] ;
  calendarOptions: CalendarOptions;
  dates: EventDatesModel;
  subscription: Array<Subscription>;
}
export interface EventDatesModel {
  startDate: Date;
  endDate: Date;
}
