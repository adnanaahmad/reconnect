import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-subject-property',
  templateUrl: './subject-property.component.html',
  styleUrls: ['./subject-property.component.scss']
})
export class SubjectPropertyComponent implements OnInit {
  @Input() subjectProperty;
  constructor() { }

  ngOnInit(): void {
  }

}
