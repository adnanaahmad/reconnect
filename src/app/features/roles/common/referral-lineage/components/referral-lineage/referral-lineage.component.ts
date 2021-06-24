import {Component, OnInit} from '@angular/core';
import { BuyerModel } from '../../models/referral-lineage.model';
import {TreeNode} from 'primeng/api';
import {MessageService} from 'primeng/api';
const NODE_DATA = [
    {
      expanded: true,
      id: 1,
      name: 'Eric Joplin',
      email: 'ejoplin@yoyodyne.com',
      phone: '555-0100',
      dealStatus: 'Real Estate Agent',
      photo: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
      children: [{
        expanded: true,
        id: 2,
        name: 'Gary Roberts',
        email: 'groberts@yoyodyne.com',
        phone: '555-0100',
        dealStatus: 'Under Agreement',
        photo: 'https://alicepropertymanagement.com/images/temp-profile.jpg',
        children: [{
          expanded: true,
          id: 3,
          name: 'Alexander Burns',
          email: 'aburns@yoyodyne.com',
          phone: '555-0102',
          dealStatus: 'Closed',
          photo: 'https://alicepropertymanagement.com/images/temp-profile.jpg',
          children: []
        },
          {
            expanded: true,
            id: 4,
            name: 'Linda Newland',
            email: 'lnewland@yoyodyne.com',
            phone: '555-0112',
            dealStatus: 'Under Agreement',
            photo: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
            children: []
          }]

      },
        {
          expanded: true,
          id: 5,
          name: 'Amy Kain',
          email: 'akain@yoyodyne.com',
          phone: '555-0106',
          dealStatus: 'Closed',
          photo: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
          children: [{
            expanded: true,
            id: 6,
            name: 'Dorothy Turner',
            email: 'dturner@yoyodyne.com',
            phone: '555-0108',
            dealStatus: 'Closed',
            photo: 'https://alicepropertymanagement.com/images/temp-profile.jpg',
            children: [
              {
                expanded: true,
                id: 11,
                name: 'Linda Newland',
                email: 'lnewland@yoyodyne.com',
                phone: '555-0112',
                dealStatus: 'Under Agreement',
                photo: 'https://img-cdn.tid.al/o/4858a4b2723b7d0c7d05584ff57701f7b0c54ce3.jpg',
                children: [
                  {
                    expanded: true,
                    id: 12,
                    name: 'Dorothy Turner',
                    email: 'dturner@yoyodyne.com',
                    phone: '555-0108',
                    dealStatus: 'Closed',
                    photo: 'https://alicepropertymanagement.com/images/temp-profile.jpg',
                    children: []
                  },
                  {
                    expanded: true,
                    id: 13,
                    name: 'Dorothy Turner',
                    email: 'dturner@yoyodyne.com',
                    phone: '555-0108',
                    dealStatus: 'Closed',
                    photo: 'https://alicepropertymanagement.com/images/temp-profile.jpg',
                    children: [
                      {
                        expanded: true,
                        id: 14,
                        name: 'Dorothy Turner',
                        email: 'dturner@yoyodyne.com',
                        phone: '555-0108',
                        dealStatus: 'Closed',
                        photo: 'https://alicepropertymanagement.com/images/temp-profile.jpg',
                        children: []
                      }
                    ]
                  }
                ]
              }
            ]
          },
            {
              expanded: true,
              id: 7,
              name: 'Dorothy Turner',
              email: 'dturner@yoyodyne.com',
              phone: '555-0108',
              dealStatus: 'Closed',
              photo: 'https://alicepropertymanagement.com/images/temp-profile.jpg',
              children: []
            },
            {
              expanded: true,
              id: 8,
              name: 'Dorothy Turner',
              email: 'dturner@yoyodyne.com',
              phone: '555-0108',
              dealStatus: 'Closed',
              photo: 'https://alicepropertymanagement.com/images/temp-profile.jpg',
              children: []
            },
            {
              expanded: true,
              id: 9,
              name: 'Dorothy Turner',
              email: 'dturner@yoyodyne.com',
              phone: '555-0108',
              dealStatus: 'Closed',
              photo: 'https://alicepropertymanagement.com/images/temp-profile.jpg',
              children: []
            },
            {
              expanded: true,
              id: 10,
              name: 'Dorothy Turner',
              email: 'dturner@yoyodyne.com',
              phone: '555-0108',
              dealStatus: 'Closed',
              photo: 'https://alicepropertymanagement.com/images/temp-profile.jpg',
              children: []
            }]
        }]
    }];
@Component({
  selector: 'app-referral-lineage',
  templateUrl: './referral-lineage.component.html',
  styleUrls: ['./referral-lineage.component.scss'],
  providers: [MessageService]

})
export class ReferralLineageComponent implements OnInit{
  public currentPerson?: BuyerModel;
  data1: TreeNode[];
  selectedNode: TreeNode;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.data1 = NODE_DATA;
  }
}
