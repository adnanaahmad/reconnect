import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CalendarOptions, EventClickArg, EventApi, FullCalendarComponent} from '@fullcalendar/angular';
import {Draggable} from '@fullcalendar/interaction';
import { CreateEventComponent} from '../../popups/create-event/create-event.component';
import {NgbModal, NgbModalConfig, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModel} from '../../models/calendar.model';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {FormControl} from '@angular/forms';
import {DatePipe} from '@angular/common';

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

  constructor(private modalService: NgbModal, private constant: ConstantService, private configuration: NgbModalConfig, private dateFormat: NgbDateNativeAdapter) {
    configuration.centered = true;
    configuration.container = 'app-calendar';
  }

  ngOnInit(): void {
    this.calendar.eventCategories = [];
    this.calendar.currentEvents = [];
    this.initializeCalendar();
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
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
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

  handleEventClick(clickInfo: EventClickArg): void {
    console.log(clickInfo)
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]): void {
    console.log(events);
    this.calendar.currentEvents = events;
  }

  createNewEventCategory(): void{
    const randomColor = this.randomColor(this.constant.eventColorDetails);
    this.calendar.eventCategories.push({title: this.newEventCategory.value, color: randomColor.color, colorIcon: randomColor.colorIcon});
    this.newEventCategory.setValue('');
  }
  randomColor(obj) {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  }
  addNewEvent(): void{
    const modalRef = this.modalService.open(CreateEventComponent);
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        console.log(result.data);
        const randomColor = this.randomColor(this.constant.eventColorDetails);
        this.calendar.eventCategories.push(
          {
          title: result.data.customEventCategory.value ? result.data.customEventCategory.value : result.data.eventCategory.value,
          color: randomColor.color,
          colorIcon: randomColor.colorIcon
          });
        this.createCalendarEvent(result, randomColor);
      }
    }, error => {
      //console.log(error);
    });
  }
  createCalendarEvent(result, randomColor): void{
    this.calendarComponent.getApi().addEvent({
      title: result.data.title,
      date: new DatePipe('en-US').transform(this.dateFormat.toModel(result.data.date), 'yyyy-MM-dd'),
      time: result.data.time,
      note: result.data.note,
      category: result.data.customEventCategory.value ? result.data.customEventCategory.value : result.data.eventCategory.value,
      id: '12',
      color: randomColor.color,
      textColor: randomColor.textColor,
    });
  }
}
