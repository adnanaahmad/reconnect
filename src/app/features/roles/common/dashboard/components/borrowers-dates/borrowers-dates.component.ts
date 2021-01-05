import { Component, OnInit } from '@angular/core';
import {BorrowersDateModel} from '../../models/dashboard.model';

@Component({
  selector: 'app-borrowers-dates',
  templateUrl: './borrowers-dates.component.html',
  styleUrls: ['./borrowers-dates.component.scss']
})
export class BorrowersDatesComponent implements OnInit {
  datesSnapShot: Array<BorrowersDateModel> = {} as Array<BorrowersDateModel>;
  constructor() { }
//
  ngOnInit(): void {
    this.datesSnapShot = [{
      name: 'Deals Closing',
      number: 2,
      buyers: [{
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcssCmrKykaX2QK3Y-J6_IfIvq9nvGZ0YwHQ&usqp=CAU',
        name: 'Robin Lampard',
        address: 'G9- Boulevard St, worchester MA 105',
        date: new Date('2020-10-12'),
      },
      {
        image: 'https://cdn.fstoppers.com/styles/large-16-9/s3/lead/2019/01/tips-for-professional-portraits.jpg',
        name: 'Sean Paul',
        address: 'G9- Boulevard St, worchester MA 105',
        date: new Date('2020-11-12'),
      }]
    },
    {
      name: 'Mortgage Commitments',
      number: 1,
      buyers: [
      {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbt2VyIA_7Y0xun9kI_R0EL11vBOEpCYOVzg&usqp=CAU',
        name: 'Mike Philly',
        address: 'G9- Boulevard St, worchester MA 105',
        date: new Date('2020-09-12'),
      }]
    },
    {
      name: 'Locks Expiring',
      number: 1,
      buyers: [
        {
          image: 'https://ohdearstudio.com.sg/wp-content/uploads/2020/10/Corporate-Studio-Headshot-sg.jpg',
          name: 'Michal Jordan',
          address: 'G9- Boulevard St, worchester MA 105',
          date: new Date('2020-12-12'),
        }]
    }];
  }
  borrower(val): void{
    console.log(val);
  }
  toggleCard(event): void{
    // close all
    const elements = Array.from(document.getElementsByClassName('buyer-div align-self-end') as HTMLCollectionOf<HTMLElement>)
    for (const item of elements) {
      if (! (item === event.target.closest('div.date-cards').children[1])){
        item.style.display = 'none';
      }
    }
    if (!event.target.closest('div.buyer-div')){
      // popup
      const element = event.target.closest('div.date-cards').children[1];
      // toggle
      element.style.display = element.style.display === 'none' || !element.style.display ? 'block' : 'none';
    }
  }
}
