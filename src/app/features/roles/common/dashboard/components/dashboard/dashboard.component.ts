import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {StoreService} from '../../../../../../core/store/store.service';
import {take} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AnalyticsModel, DashboardModel, DatesModel} from '../../models/dashboard.model';
import {DatePipe} from '@angular/common';
import {NgbCalendar, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import {DashboardService} from '../../services/dashboard.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  dashboard: DashboardModel;
  constructor(public store: StoreService,
              private dateFormat: NgbDateNativeAdapter,
              private dashboardService: DashboardService,
              private calendar: NgbCalendar,
              public constant: ConstantService) {
  }
  ngOnInit(): void {
    this.initializeData();
    this.getDashboardDataBasedOnDefaultDates();
    this.getDashboardDataBasedOnDates();
  }
  ngOnDestroy(): void {
    this.store.updateDashboardDate(null);
    this.subscription.unsubscribe();
  }
  initializeData(): void {
    this.dashboard = {} as DashboardModel;
    this.dashboard.dates = {} as DatesModel;
    this.dashboard.analytics = {} as AnalyticsModel;
    this.dashboard.loader = false;
  }
  getDashboardDataBasedOnDefaultDates(): void{
    this.dashboard.dates.buyerAnalyticsDateStart = this.dateConversion(this.calendar.getToday());
    this.dashboard.dates.buyerAnalyticsDateEnd = this.dateConversion(this.calendar.getNext(this.calendar.getToday(), 'd', 30));
    this.dashboard.dates.personalSalesAnalyticsDateStart = this.dateConversion(this.calendar.getNext(this.calendar.getToday(), 'd', -30));
    this.dashboard.dates.personalSalesAnalyticsDateEnd = this.dateConversion(this.calendar.getNext(this.calendar.getToday(), 'd', 0));
    this.dashboard.dates.teamDynastyAnalyticsDateStart = this.dateConversion(this.calendar.getNext(this.calendar.getToday(), 'd', -30));
    this.dashboard.dates.teamDynastyAnalyticsDateEnd = this.dateConversion(this.calendar.getNext(this.calendar.getToday(), 'd', 0));
    this.dashboard.dates.commissionsAnalyticsDateStart = this.dateConversion(this.calendar.getNext(this.calendar.getToday(), 'd', -15));
    this.dashboard.dates.commissionsAnalyticsDateEnd = this.dateConversion(this.calendar.getNext(this.calendar.getToday(), 'd', +15));
    this.getDashboardData();
  }
  getDashboardDataBasedOnDates(): void{
    this.subscription = this.store.dashboardDate.subscribe(res => {
      if (res) {
        this.helperGetDates(res);
        this.getDashboardData();
        console.log(this.objectToQueryParam(this.dashboard.dates));
      }
    });
  }
  getDashboardData(): void{
    this.store.updateProgressBarLoading(true);
    this.dashboardService.getDashboardAnalytics(this.objectToQueryParam(this.dashboard.dates)).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.dashboard.loader = true;
      this.dashboard.analytics = res.result;
      this.store.updateProgressBarLoading(false);
    }, error => {
      console.log(error);
      this.store.updateProgressBarLoading(false);
    });
  }
  dateConversion(date): string{
    return new DatePipe('en-US').transform(this.dateFormat.toModel(date), 'yyyy-MM-dd');
  }
  helperGetDates(dates): void{
    switch (Object.keys(dates)[0]) {
      case 'borrower':
        this.dashboard.dates.buyerAnalyticsDateStart =  this.dateConversion(dates.borrower[0]);
        this.dashboard.dates.buyerAnalyticsDateEnd =  this.dateConversion(dates.borrower[1]);
        break;
      case 'personal':
        this.dashboard.dates.personalSalesAnalyticsDateStart =  this.dateConversion(dates.personal[0]);
        this.dashboard.dates.personalSalesAnalyticsDateEnd =  this.dateConversion(dates.personal[1]);
        break;
      case 'teamDynasty':
        this.dashboard.dates.teamDynastyAnalyticsDateStart =  this.dateConversion(dates.teamDynasty[0]);
        this.dashboard.dates.teamDynastyAnalyticsDateEnd =  this.dateConversion(dates.teamDynasty[1]);
        break;
      case 'commission':
        this.dashboard.dates.commissionsAnalyticsDateStart =  this.dateConversion(dates.commission[0]);
        this.dashboard.dates.commissionsAnalyticsDateEnd =  this.dateConversion(dates.commission[1]);
        break;
      default:
    }
  }
  objectToQueryParam(data): string{
    return Object.keys(data).map(key => key + '=' + data[key]).join('&');
  }
}
