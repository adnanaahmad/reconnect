import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {RemoveMemberComponent} from '../../popups/remove-member/remove-member.component';
import {config} from 'rxjs';
import {BuyerDashboardModel} from '../../models/dashboard.model';

@Component({
  selector: 'app-home-buying-dashboard',
  templateUrl: './home-buying-dashboard.component.html',
  styleUrls: ['./home-buying-dashboard.component.scss']
})
export class HomeBuyingDashboardComponent implements OnInit {
  dashboard: BuyerDashboardModel = {} as BuyerDashboardModel;
  constructor() {}

  ngOnInit(): void {
    this.dashboard = {
      preApprovalDetails: {
        income: 5321.12,
        monthlyLiabilities: 921.12,
        assets: 1021.12
      },
      team: [
        {
          name: 'Rafael Nadal',
          role: 'Real Estate Agent',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkqkWLzMbf_6cUuaxj9rAaJ61f3ntPBoto9g&usqp=CAU',
          phone: '+942 23 1 6783',
          email: 'abc@gmail.com'
        },
        {
          name: 'Parineeti Akash',
          role: 'Lender',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3UQl0sqcrJGd-tT4QCmfmPFv6AQKmQpSJHA&usqp=CAU',
          phone: '+942 23 1 6783',
          email: 'abc@gmail.com'
        },
        {
          name: 'Paul Jensen',
          role: 'Attorney',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr2RcD2fiReC2iLFK2CFL0MXCJrWaD7pPf5Q&usqp=CAU',
          phone: '+942 23 1 6783',
          email: 'abc@gmail.com'
        },
        {
          name: 'Ali Mustaqeem',
          role: 'Home Inspector',
          image: 'https://www.rashidahdevore.com/uploads/9/0/0/6/90067921/ssp-64544-fs-web.jpg',
          phone: '+942 23 1 6783',
          email: 'abc@gmail.com'
        },
        {
          name: 'Rahim Ali',
          role: 'Insurance Agent',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcQeTDPANCGDQkVik0SBPix19KW-EFxphfag&usqp=CAU',
          phone: '+942 23 1 6783',
          email: 'abc@gmail.com'
        }
      ],
      homeBuyingProcess:{
        application: true,
        preApproved: true,
        acceptedOffer: true,
        underwriting: true,
        approvedWithConditions: true,
        clearedToClose: true,
        closed: true,
      },
      subjectProperty: {
        image: 'https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHw%3D&w=1000&q=80',
        bathrooms: 2,
        bedrooms: 2,
        garage: 1,
        sqFt: 1594,
        status: 'Active',
        propertyType: '2 Units Up/Down',
        lotSize: 4898,
        timeOnMarket: '8 Days',
        community: 'Worcester',
        mls: 726168,
      }
    };
  }
  removeMember(member): void{
      //console.log(member);
      const index =  this.dashboard.team.findIndex(x => x === member);
      this.dashboard.team[index] = undefined;
  }
}
