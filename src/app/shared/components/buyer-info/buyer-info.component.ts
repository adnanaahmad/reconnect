import {Component, Input, OnInit} from '@angular/core';
import {UserModel} from '../../../features/roles/lender/transaction-details/models/transactionDetails.model';

@Component({
  selector: 'app-buyer-info',
  templateUrl: './buyer-info.component.html',
  styleUrls: ['./buyer-info.component.scss']
})
export class BuyerInfoComponent implements OnInit {
  @Input() transactionDetails: UserModel = {} as UserModel;
  constructor() { }

  ngOnInit(): void {
  }

}
