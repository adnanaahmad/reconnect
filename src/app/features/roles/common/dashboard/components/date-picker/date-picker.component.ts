import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Input() section;
  @Output() dateRange: EventEmitter<any> = new EventEmitter<any>();
  hoveredDate: NgbDate | null = null;
  minDate: any;
  maxDate: any;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private config: NgbDatepickerConfig) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 0);
  }

  ngOnInit(): void {
    console.log(this.section);
    const current = new Date();
    if (this.section === 'borrower'){
      this.minDate = {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate()
      };
    }
    else if (this.section === 'personal'){
      this.maxDate = {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        day: current.getDate()
      };
    }
  }
  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  save(){
    this.dateRange.emit([this.fromDate, this.toDate]);
  }

}
