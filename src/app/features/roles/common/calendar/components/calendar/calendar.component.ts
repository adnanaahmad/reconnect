import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {EventClickArg, FullCalendarComponent} from '@fullcalendar/angular';
import { CreateEventComponent} from '../../../../../../shared/components/create-event/create-event.component';
import {NgbModal, NgbModalConfig, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {CalendarModel, EventDatesModel} from '../../models/calendar.model';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {FormControl} from '@angular/forms';
import {ViewEventComponent} from '../../popups/view-event/view-event.component';
import {CalendarService} from '../../services/calendar.service';
import {take} from 'rxjs/operators';
import {StoreService} from '../../../../../../core/store/store.service';
import {ToastrService} from 'ngx-toastr';
import {HelperService} from '../../../../../../core/helper/helper.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CalendarComponent implements OnInit, OnDestroy {
  calendar: CalendarModel = {} as CalendarModel;
  newEventCategory = new FormControl(null);
  @ViewChild('cal') calendarComponent: FullCalendarComponent;

  constructor(private modalService: NgbModal,
              private constant: ConstantService,
              private configuration: NgbModalConfig,
              private dateFormat: NgbDateNativeAdapter,
              private calendarService: CalendarService,
              public store: StoreService,
              private toaster: ToastrService,
              private helper: HelperService,
              private activatedRoute: ActivatedRoute) {
    configuration.centered = true;
    configuration.container = 'app-calendar';
    configuration.animation = true;
  }

  ngOnInit(): void {
    this.calendar.subscription = [];
    this.calendar.eventCategories = [];
    this.calendar.currentEvents = [];
    this.calendar.dates = this.setDateRange(new Date());
    this.getCalendarEventsAndCategories();
    this.calendar.subscription.push(
        this.activatedRoute.queryParams.subscribe(params => {
          if (params.viewEvent){
            this.getEventById(params.viewEvent);
          }
        })
    );
  }
  ngOnDestroy(): void {
    this.calendar.subscription.forEach(x => x.unsubscribe());
  }
  getEventById(id): void{
    this.calendarService.getCalendarEventById(id).pipe(take(1)).subscribe(res => {
      this.viewInvitedEventFromNotification(this.eventDataStructure(res.result[0]));
    }, error => {
      this.helper.handleApiError(error, 'Failed to retrieve event');
    });
  }
  getCalendarEventsAndCategories(): void{
    this.store.updateProgressBarLoading(true);
    this.calendarService.getCalendarEvents(this.objectToQueryParam(this.calendar.dates)).pipe(take(1)).subscribe(res => {
      console.log('calendar events', res);
      this.store.updateProgressBarLoading(false);
      this.calendar.eventCategories = res.result.categories;
      res.result.events.forEach(element => {
           element = this.setInviteEventColor(element);
           this.calendar.currentEvents.push(element);
      });
      this.initializeCalendar(this.calendar.currentEvents);
    }, error => {
      this.helper.handleApiError(error, 'Failed to retrieve events');
      this.store.updateProgressBarLoading(false);
    });
  }
  getCalendarEvents(): void{
    this.calendarService.getCalendarEvents(this.objectToQueryParam(this.calendar.dates)).pipe(take(1)).subscribe(res => {
      this.calendarComponent.getApi().removeAllEvents();
      res.result.events.forEach(element => {
        element = this.setInviteEventColor(element);
        this.calendarComponent.getApi().addEvent(element);
      });
    }, error => {
      this.helper.handleApiError(error, 'Failed to retrieve events');
    });
  }
  initializeCalendar(eventList): void {
    this.calendar.calendarOptions = {
      headerToolbar: {
        left: 'title',
        right: 'today'
      },
      initialView: 'dayGridMonth',
      displayEventTime: false,
      defaultTimedEventDuration: '00:00',
      eventDisplay: 'block',
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventClick: this.viewEvent.bind(this),
      events: eventList,
      eventDrop: (info) => {
        console.log(('event drop'), info);
      },
      locale: 'en',
      eventStartEditable: false,
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }
  createNewEventCategory(): void{
    const randomColor = this.randomColor(this.constant.eventColorDetails);
    const data = {
      title: this.newEventCategory.value,
      color: randomColor.color,
      colorIcon: randomColor.colorIcon,
      textColor: randomColor.textColor,
    };
    this.calendarService.createCategory(data).pipe(take(1)).subscribe(res => {
      this.calendar.eventCategories.push(res.result);
      this.newEventCategory.reset();
      this.toaster.success('Category created successfully');
    }, error => {
      console.log(error);
      this.toaster.error('Failed to add category');
    });
  }
  addNewEvent(): void{
    const modalRef = this.modalService.open(CreateEventComponent);
    modalRef.componentInstance.eventCategories = this.calendar.eventCategories;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        // console.log(result.data);
        this.calendarComponent.getApi().addEvent(result.data);
      }
    }, error => {
      console.log(error);
    });
  }
  viewEvent(clickInfo: EventClickArg): void {
    const modalRef = this.modalService.open(ViewEventComponent);
    modalRef.componentInstance.view = clickInfo.event;
    modalRef.result.then((res) => {
      if (res.status === 'edit') {
        this.editEvent(clickInfo);
      } else if (res.status === 'remove'){
        clickInfo.event.remove();
      }
    }, error => {
      console.log(error);
    });
  }
  viewInvitedEventFromNotification(data): void {
    const modalRef = this.modalService.open(ViewEventComponent);
    modalRef.componentInstance.view = data;
    modalRef.result.then((res) => {
      if (res.status === 'no'){
        window.history.replaceState({}, '', `/home/calendar`);
      }
    }, error => {
      window.history.replaceState({}, '', `/home/calendar`);
    });
  }
  editEvent(clickInfo: EventClickArg): void{
    const modal = this.modalService.open(CreateEventComponent);
    modal.componentInstance.edit = clickInfo.event;
    modal.componentInstance.eventCategories = this.calendar.eventCategories;
    modal.result.then((result) => {
      if (result.status === 'yes'){
        clickInfo.event.remove();
        this.calendarComponent.getApi().addEvent(result.data);
      }
    }, error => {
      console.log(error);
    });
  }
  randomColor(obj) {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  }

  deleteEventCategory(id: string): void{
    this.calendarService.removeEventCategory(id, this.objectToQueryParam(this.calendar.dates)).pipe(take(1)).subscribe(res => {
      this.calendar.eventCategories = res.result.categories;
      this.calendarComponent.getApi().removeAllEvents();
      res.result.events.forEach(element => {
        element = this.setInviteEventColor(element);
        this.calendarComponent.getApi().addEvent(element);
      });
      this.toaster.success('Category removed successfully');
    }, error => {
      this.toaster.error('Failed to remove category');
    });
  }
  previous(): void{
    this.calendarComponent.getApi().prev();
    this.calendar.dates = this.setDateRange(this.calendarComponent.getApi().getDate());
    this.getCalendarEvents();
   // console.log(this.calendar.dates);
  }
  next(): void{
    this.calendarComponent.getApi().next();
    this.calendar.dates = this.setDateRange(this.calendarComponent.getApi().getDate());
    this.getCalendarEvents();
    // console.log(this.calendar.dates);
  }
  setDateRange(date: Date): EventDatesModel {
    const y = date.getFullYear();
    const m = date.getMonth();
    return {
      endDate: new Date(y, m + 1, 1),
      startDate: new Date(y, m, 0)
    };
  }
  objectToQueryParam(data): string{
    return Object.keys(data).map(key => key + '=' + data[key]).join('&');
  }
  setInviteEventColor(element) {
    if (element.createdBy !== this.store.userId){
      element.color = this.constant.eventColorDetails.pink.color;
      element.colorIcon = this.constant.eventColorDetails.pink.colorIcon;
      element.textColor = this.constant.eventColorDetails.pink.textColor;
    }
    return element;
  }
  eventDataStructure(data): {_instance: any; _def: any; } {
    return {
      _instance: {
        range: {
          start: data.date
        }
      },
      _def: {
        title: data.title,
        extendedProps: {
          team: data.team,
          members: data.members,
          category: data.category,
          note: data.note,
          _id: data._id,
          createdBy: data.createdBy
        }
      }
    };
  }
}
