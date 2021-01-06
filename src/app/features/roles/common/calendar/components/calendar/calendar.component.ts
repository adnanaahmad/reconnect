import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CalendarOptions, EventClickArg, EventApi, FullCalendarComponent} from '@fullcalendar/angular';
import {Draggable} from '@fullcalendar/interaction';
import { CreateEventComponent} from '../../popups/create-event/create-event.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModel} from '../../models/calendar.model';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {FormControl} from '@angular/forms';

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

  constructor(private modalService: NgbModal, private constant: ConstantService, private configuration: NgbModalConfig) {
    configuration.centered = true;
    //configuration.size = '900';
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
    // this.calendarComponent.getApi().addEvent({
    //   title: 'oye',
    //   date: '2021-01-02',
    //   description: 'here it is',
    //      color: eventColor,
    //      textColor: eventTextColor,
    //      id: '12'
    // });
  }
  randomColor(obj) {
    const keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
  }
  addNewEvent(): void{
    const modalRef = this.modalService.open(CreateEventComponent);
    modalRef.result.then((result) => {
      if (result.status === 'yes') {
        //console.log(result.data);
        const randomColor = this.randomColor(this.constant.eventColorDetails);
        this.calendar.eventCategories.push(
          {
          title: result.data.customCategory,
          color: randomColor.color,
          colorIcon: randomColor.colorIcon
          });
        this.calendarComponent.getApi().addEvent({
          title: result.data.title,
          date: result.data.date,
          time: result.data.time,
          note: result.data.note,
          category: result.data.customCategory,
          id: '12',
          color: randomColor.color,
          textColor: randomColor.textColor,
        });
      }
    }, error => {
      //console.log(error);
    });
  }
}
