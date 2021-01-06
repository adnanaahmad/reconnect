import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { CalendarOptions, EventClickArg, EventApi } from '@fullcalendar/angular';
import {Draggable} from '@fullcalendar/interaction';
import { CreateEventComponent} from '../../popups/create-event/create-event.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalService: NgbModal, private constant: ConstantService) { }

  ngOnInit(): void {
    this.calendar.eventCategories = [];
    this.calendar.currentEvents = [];
    this.initializeCalendar();
    this.makeNewEventDraggable();
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
        info.draggedEl.parentNode.removeChild(info.draggedEl);
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

  makeNewEventDraggable(): void {
    const containerEl = document.getElementById('external-events');
    new Draggable(containerEl, {
      itemSelector: '.fc-event',
      eventData: (eventEl) => {
        let eventColor = '';
        let eventTextColor = '';
        const img = eventEl.getElementsByTagName('img')[0].src.split('/');
        const imageColor = img[img.length - 1];
        if (imageColor === 'purple.svg'){
          console.log(true);
          eventColor = '#E1D9FF';
          eventTextColor = '#8261FF';
        } else if (imageColor === 'orange.svg'){
          eventColor = '#FFDDC2';
          eventTextColor = '#F1954D';
        } else if (imageColor === 'yellow.svg'){
          eventColor = '#FFFBC7';
          eventTextColor = '#D5C932';
        } else if (imageColor === 'green.svg'){
          eventColor = '#D3FFC8';
          eventTextColor = '#66C94D';
        }
        else if (imageColor === 'blue.svg'){
          eventColor = '#CBFFF9';
          eventTextColor = '#37DFCC';
        }
        return {
          title: eventEl.innerText,
          color: eventColor,
          textColor: eventTextColor,
          id: '12'
        };
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg): void {
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

}
