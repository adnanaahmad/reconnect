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

    constructor(private dashboardService: BuyerDashboardService) {
    }

    ngOnDestroy(): void {
        this.teamSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.dashboard.loader = false;
        this.getTeam();
        this.getLoanDetails();
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
    }

    removeMember(members): void {
        this.dashboard.team = members;
    }

    addMember(members): void {
        this.dashboard.team = members;
    }

    getTeam(): void {
        this.teamSubscription = this.dashboardService.getTeam().subscribe(res => {
            console.log(res);
            this.dashboard.team = res.result;
        }, error => {
            console.log(error);
        });
    }
    getLoanDetails(): void{
        this.dashboardService.getLoanDetails().subscribe(res => {
            res = res.result;
            this.dashboard.subjectProperty = res.targetProperty ? res.targetPropertyDetails : null;
            this.dashboard.loader = true;

        }, error => {
            console.log(error);
        });
    }
}
