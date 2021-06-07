import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../../core/store/store.service';

@Component({
  selector: 'app-compliance-info',
  templateUrl: './compliance-info.component.html',
  styleUrls: ['./compliance-info.component.scss']
})
export class ComplianceInfoComponent implements OnInit {
  year: any;
  constructor(public store: StoreService) { }

  ngOnInit(): void {
    this.year = (new Date()).getUTCFullYear();
  }

}
