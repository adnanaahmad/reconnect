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
              private dateFormat: NgbDateNativeAdapter) {
    configuration.centered = true;
    configuration.container = 'app-calendar';
    configuration.animation = false;
  }

  ngOnInit(): void {
    this.calendar.eventCategories = [];
    this.calendar.currentEvents = [];
    this.initializeCalendar();
    this.predefinedEventCategories();
  }
  initializeCalendar(): void {
    this.calendar.calendarOptions = {
      headerToolbar: {
        left: 'title',
        center: 'prev,next',
        right: 'today'
      },
      initialView: 'dayGridMonth',
      weekends: true,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      eventClick: this.viewEvent.bind(this),
      eventsSet: this.handleEvents.bind(this),
      //events: [{title: 'oye', date: '2021-01-05'}],
      eventReceive: (info) => {
        console.log('event receive', info);
      },
      eventDrop: (info) => {
        console.log(('event drop'), info);
      }
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }

  viewEvent(clickInfo: EventClickArg): void {
    //console.log(clickInfo);
    const modalRef = this.modalService.open(ViewEventComponent);
    modalRef.componentInstance.view = clickInfo.event;
    modalRef.result.then((res) => {
      if (res.status === 'yes') {
        this.editEvent(clickInfo);
      }
    }, error => {
      //console.log(error);
    });
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }
  editEvent(clickInfo: EventClickArg): void{
    const modal = this.modalService.open(CreateEventComponent);
    modal.componentInstance.edit = clickInfo.event;
    modal.componentInstance.eventCategories = this.calendar.eventCategories;
    modal.result.then((result) => {
      if (result.status === 'yes'){
        clickInfo.event.remove();
        this.addEvent(result);
      }
    }, error => {
      //console.log(error);
    });
  }

  handleEvents(events: EventApi[]): void {
    console.log(events);
    this.calendar.currentEvents = events;
  }

  createNewEventCategory(): void{
    const randomColor = this.randomColor(this.constant.eventColorDetails);
    this.calendar.eventCategories.push({title: this.newEventCategory.value, color: randomColor.color, colorIcon: randomColor.colorIcon});
    this.newEventCategory.reset();
  }
  randomColor(obj) {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  }
  addNewEvent(): void{
    const modalRef = this.modalService.open(CreateEventComponent);
    modalRef.componentInstance.eventCategories = this.calendar.eventCategories;
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        //console.log(result.data);
        this.addEvent(result);
      }
    }, error => {
      //console.log(error);
    });
  }
  addEvent(result): void{
    let randomColor;
    let title;
    if (result.data.customEventCategory.value){
      randomColor = this.randomColor(this.constant.eventColorDetails);
      title =  result.data.customEventCategory.value;
      this.calendar.eventCategories.push(
        {
          title: title,
          color: randomColor.color,
          colorIcon: randomColor.colorIcon
        });
    } else {
      randomColor = this.calendar.eventCategories.find(x => x.title === result.data.eventCategory.value);
      title = result.data.eventCategory.value;
    }
    this.createCalendarEvent(result, randomColor, title);
  }
  createCalendarEvent(result, randomColor, eventCategory): void{
    this.calendarComponent.getApi().addEvent({
      title: result.data.title,
      date: new DatePipe('en-US').transform(this.dateFormat.toModel(result.data.date), 'yyyy-MM-dd'),
      time: result.data.time,
      note: result.data.note,
      category: eventCategory,
      team: result.data.team,
      id: '12',
      color: randomColor.color,
      textColor: randomColor.textColor,
    });
  }
  predefinedEventCategories(): void{
    this.calendar.eventCategories.push({
      title: 'Final work through',
      color: this.constant.eventColorDetails.purple.color,
      textColor: this.constant.eventColorDetails.purple.textColor,
      colorIcon: this.constant.eventColorDetails.purple.colorIcon,
    });
    this.calendar.eventCategories.push({
      title: 'Showing',
      color: this.constant.eventColorDetails.blue.color,
      textColor: this.constant.eventColorDetails.blue.textColor,
      colorIcon: this.constant.eventColorDetails.blue.colorIcon,
    });
    this.calendar.eventCategories.push({
      title: 'New buyer appointments',
      color: this.constant.eventColorDetails.orange.color,
      textColor: this.constant.eventColorDetails.orange.textColor,
      colorIcon: this.constant.eventColorDetails.orange.colorIcon,
    });
    this.calendar.eventCategories.push({
      title: 'Office Meeting',
      color: this.constant.eventColorDetails.green.color,
      textColor: this.constant.eventColorDetails.green.textColor,
      colorIcon: this.constant.eventColorDetails.green.colorIcon,
    });
    this.calendar.eventCategories.push({
      title: 'Commitment',
      color: this.constant.eventColorDetails.yellow.color,
      textColor: this.constant.eventColorDetails.yellow.textColor,
      colorIcon: this.constant.eventColorDetails.yellow.colorIcon,
    });
  }
}
