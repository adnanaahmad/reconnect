import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subject-property-details',
  templateUrl: './subject-property-details.component.html',
  styleUrls: ['./subject-property-details.component.scss']
})
export class SubjectPropertyDetailsComponent implements OnInit {
  @Input() subjectProperty;
  constructor() { }

  ngOnInit(): void {
  }

}
