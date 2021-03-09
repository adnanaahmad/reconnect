import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {HelperService} from '../../../../../../core/helper/helper.service';

@Component({
  selector: 'app-commissions-earned',
  templateUrl: './commissions-earned.component.html',
  styleUrls: ['./commissions-earned.component.scss']
})
export class CommissionsEarnedComponent implements OnInit {
  @Input() commissionAnalytics: any;
  @Input() personalVolume: number;
  constructor(public helper: HelperService) { }

  ngOnInit(): void {
  }
}
