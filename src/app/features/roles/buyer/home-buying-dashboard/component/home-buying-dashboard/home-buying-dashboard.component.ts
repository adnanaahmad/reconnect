import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {RemoveMemberComponent} from '../../popups/remove-member/remove-member.component';
import {config, Subscription} from 'rxjs';
import {BuyerDashboardModel} from '../../models/dashboard.model';
import {BuyerDashboardService} from '../../services/buyer-dashboard.service';

@Component({
  selector: 'app-home-buying-dashboard',
  templateUrl: './home-buying-dashboard.component.html',
  styleUrls: ['./home-buying-dashboard.component.scss']
})
export class HomeBuyingDashboardComponent implements OnInit, OnDestroy {
  dashboard: BuyerDashboardModel = {} as BuyerDashboardModel;
  teamSubscription: Subscription;
  constructor(private dashboardService: BuyerDashboardService) {}
  ngOnDestroy(): void {
    this.teamSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.teamSubscription = this.dashboardService.getTeam().subscribe(res => {
      console.log(res);
      this.dashboard.team = res.result;
    }, error => {
      console.log(error);
    });
    this.dashboard.preApprovalDetails = {
        income: 5321.12,
        monthlyLiabilities: 921.12,
        assets: 1021.12
    };

    this.dashboard.homeBuyingProcess = {
        application: true,
        preApproved: true,
        acceptedOffer: true,
        underwriting: true,
        approvedWithConditions: true,
        clearedToClose: true,
        closed: true,
    };

    this.dashboard.subjectProperty = {
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
    };
  }
  removeMember(members): void{
    this.dashboard.team = members;
  }
  addMember(members): void{
    this.dashboard.team = members;
  }
}
