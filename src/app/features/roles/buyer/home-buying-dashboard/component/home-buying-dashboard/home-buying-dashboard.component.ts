import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {RemoveMemberComponent} from '../../popups/remove-member/remove-member.component';
import {config, forkJoin, Subscription} from 'rxjs';
import {BuyerDashboardModel} from '../../models/dashboard.model';
import {BuyerDashboardService} from '../../services/buyer-dashboard.service';
import {take} from 'rxjs/operators';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {StoreService} from '../../../../../../core/store/store.service';

@Component({
    selector: 'app-home-buying-dashboard',
    templateUrl: './home-buying-dashboard.component.html',
    styleUrls: ['./home-buying-dashboard.component.scss']
})
export class HomeBuyingDashboardComponent implements OnInit, OnDestroy {
    dashboard: BuyerDashboardModel = {} as BuyerDashboardModel;

    constructor(private dashboardService: BuyerDashboardService,
                private constant: ConstantService,
                private store: StoreService) {
    }

    ngOnDestroy(): void {}

    ngOnInit(): void {
        this.dashboard.loader = false;
        this.store.updateProgressBarLoading(true);
        this.dashboard.homeBuyingProcess = {
            application: false,
            preApproved: false,
            acceptedOffer: false,
            underwriting: false,
            approvedWithConditions: false,
            clearedToClose: false,
            closed: false,
        };
        this.getTeamAndLoanDetails();
    }

    removeMember(members): void {
        this.dashboard.team = members;
    }

    addMember(members): void {
        this.dashboard.team = members;
    }

    getTeamAndLoanDetails(): void {
        forkJoin([this.dashboardService.getTeam(), this.dashboardService.getLoanDetails()]).pipe(take(1)).subscribe(res => {
//            console.log('forkJoin', res);
            this.dashboard.team = res[0].result;
            this.dashboard.subjectProperty = res[1].result.targetProperty;
            this.setHomeBuyingProcessStatus(res[1].result.processStatus);
            this.dashboard.preApprovalDetails = {
                income: res[1].result.income,
                monthlyLiabilities: res[1].result.monthlyDebt,
                assets: res[1].result.funds
            };
            this.dashboard.loader = true;
            this.store.updateProgressBarLoading(false);
        }, error => {
            console.log(error);
            this.store.updateProgressBarLoading(false);
        });
    }

    setHomeBuyingProcessStatus(status): void {
        if (status) {
            Object.keys(this.dashboard.homeBuyingProcess).forEach((x, index) => {
                if (index <= this.constant.homeBuyingProcessStatusIndex[status]) {
                    this.dashboard.homeBuyingProcess[x] = true;
                }
            });
        }
    }
}
