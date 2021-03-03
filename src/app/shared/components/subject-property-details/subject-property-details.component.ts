import {Component, Input, OnInit} from '@angular/core';
import {PropertyAdModel} from '../../../features/roles/common/property-details/models/property-details.model';

@Component({
  selector: 'app-subject-property-details',
  templateUrl: './subject-property-details.component.html',
  styleUrls: ['./subject-property-details.component.scss']
})
export class SubjectPropertyDetailsComponent implements OnInit {
  @Input() subjectProperty: PropertyAdModel;
  constructor() { }

  ngOnInit(): void {
  }

}
