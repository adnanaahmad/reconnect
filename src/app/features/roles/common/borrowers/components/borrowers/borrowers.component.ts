import { Component, OnInit } from '@angular/core';
import {BorrowersModel} from '../../models/borrowers.model';

@Component({
  selector: 'app-borrowers',
  templateUrl: './borrowers.component.html',
  styleUrls: ['./borrowers.component.scss']
})
export class BorrowersComponent implements OnInit {
  borrowers: BorrowersModel = {} as BorrowersModel;
  constructor() { }

  ngOnInit(): void {
    this.borrowers.buttons = ['Pending', 'Pre-Approved', 'Potential', 'Closed'];
    this.borrowers.selectedButton = this.borrowers.buttons[0];
    this.borrowers.borrower = [
      {
        photo: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
        fullName: 'James Hetfield',
        phoneNumber: '+987 65 2 9873',
        targetPropertyAddress: '123 Main St Auburn, MA 0510',
        closingDate: new Date('2019-10-12'),
        commitmentDate: new Date('2020-10-12'),
        homeInspectionDate: new Date('2021-10-12'),
        purchaseSalesDate: new Date('2022-10-12'),
        status: {
          application: true,
          preApproved: true,
          acceptedOffer: true,
          underwriting: false,
          approvedWithConditions: false,
          clearedToClose: false
        }
      },
      {
        photo: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
        fullName: 'James Hetfield',
        phoneNumber: '+987 65 2 9873',
        targetPropertyAddress: '123 Main St Auburn, MA 0510',
        closingDate: new Date('2019-10-12'),
        commitmentDate: new Date('2020-10-12'),
        homeInspectionDate: new Date('2021-10-12'),
        purchaseSalesDate: new Date('2022-10-12'),
        status: {
          application: true,
          preApproved: true,
          acceptedOffer: true,
          underwriting: false,
          approvedWithConditions: false,
          clearedToClose: false
        }
      },
      {
        photo: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
        fullName: 'James Hetfield',
        phoneNumber: '+987 65 2 9873',
        targetPropertyAddress: '123 Main St Auburn, MA 0510',
        closingDate: new Date('2019-10-12'),
        commitmentDate: new Date('2020-10-12'),
        homeInspectionDate: new Date('2021-10-12'),
        purchaseSalesDate: new Date('2022-10-12'),
        status: {
          application: true,
          preApproved: true,
          acceptedOffer: true,
          underwriting: false,
          approvedWithConditions: false,
          clearedToClose: false
        }
      }

      ];
  }

  listClick(button): void {
    this.borrowers.selectedButton = button;
  }

}
