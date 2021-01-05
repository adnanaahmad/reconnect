import { CalendarOptions, EventApi } from '@fullcalendar/angular';

export interface CalendarModel {
  eventCategories: Array<any>;
  currentEvents: EventApi[] ;
  calendarOptions: CalendarOptions;
}
