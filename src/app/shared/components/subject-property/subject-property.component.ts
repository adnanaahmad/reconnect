import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PropertyAdModel} from '../../../features/roles/common/property-details/models/property-details.model';

@Component({
  selector: 'app-subject-property',
  templateUrl: './subject-property.component.html',
  styleUrls: ['./subject-property.component.scss']
})
export class SubjectPropertyComponent implements OnInit {
  @Input() subjectProperty: PropertyAdModel;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  viewSubjectProperty(): void{
    this.router.navigateByUrl(`/home/propertyDetails/${this.subjectProperty.id}`).then();
  }
}
