import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CalendarOptions, EventClickArg, EventApi, FullCalendarComponent} from '@fullcalendar/angular';
import {Draggable} from '@fullcalendar/interaction';
import { CreateEventComponent} from '../../popups/create-event/create-event.component';
import {NgbModal, NgbModalConfig, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModel} from '../../models/calendar.model';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ViewEventComponent} from '../../popups/view-event/view-event.component';
import {CalendarService} from '../../services/calendar.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CalendarComponent implements OnInit {
  calendar: CalendarModel = {} as CalendarModel;
  newEventCategory = new FormControl(null);
  @ViewChild('cal') calendarComponent: FullCalendarComponent;

  constructor(private modalService: NgbModal,
              private constant: ConstantService,
              private configuration: NgbModalConfig,
              private dateFormat: NgbDateNativeAdapter,
              private calendarService: CalendarService) {
    configuration.centered = true;
    configuration.container = 'app-calendar';
    configuration.animation = true;
  }

  ngOnInit(): void {
    this.calendar.eventCategories = [];
    this.calendar.currentEvents = [];
    this.getCalendarEventsAndCategories();
  }
  getCalendarEventsAndCategories(): void{
    this.calendarService.getCalendarEvents().pipe(take(1)).subscribe(res => {
      console.log('calendar events', res);
      this.calendar.eventCategories = res.result.categories;
      this.calendar.currentEvents = res.result.events;
      this.initializeCalendar(this.calendar.currentEvents);
    }, error => {
      console.log(error);
    });
  }
  initializeCalendar(eventList): void {
    this.calendar.calendarOptions = {
      headerToolbar: {
        left: 'title',
        center: 'prev,next',
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
    }, error => {
      console.log(error);
    });
  }
  addNewEvent(): void{
    const modalRef = this.modalService.open(CreateEventComponent);
    modalRef.componentInstance.eventCategories = this.calendar.eventCategories;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        //console.log(result.data);
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
      if (res.status === 'yes') {
        this.editEvent(clickInfo);
      }
    }, error => {
      console.log(error);
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
  // predefinedEventCategories(): void{
  //   this.calendar.eventCategories.push({
  //     title: 'Final work through',
  //     color: this.constant.eventColorDetails.purple.color,
  //     textColor: this.constant.eventColorDetails.purple.textColor,
  //     colorIcon: this.constant.eventColorDetails.purple.colorIcon,
  //   });
  //   this.calendar.eventCategories.push({
  //     title: 'Showing',
  //     color: this.constant.eventColorDetails.blue.color,
  //     textColor: this.constant.eventColorDetails.blue.textColor,
  //     colorIcon: this.constant.eventColorDetails.blue.colorIcon,
  //   });
  //   this.calendar.eventCategories.push({
  //     title: 'New buyer appointments',
  //     color: this.constant.eventColorDetails.orange.color,
  //     textColor: this.constant.eventColorDetails.orange.textColor,
  //     colorIcon: this.constant.eventColorDetails.orange.colorIcon,
  //   });
  //   this.calendar.eventCategories.push({
  //     title: 'Office Meeting',
  //     color: this.constant.eventColorDetails.green.color,
  //     textColor: this.constant.eventColorDetails.green.textColor,
  //     colorIcon: this.constant.eventColorDetails.green.colorIcon,
  //   });
  //   this.calendar.eventCategories.push({
  //     title: 'Commitment',
  //     color: this.constant.eventColorDetails.yellow.color,
  //     textColor: this.constant.eventColorDetails.yellow.textColor,
  //     colorIcon: this.constant.eventColorDetails.yellow.colorIcon,
  //   });
  // }
}
