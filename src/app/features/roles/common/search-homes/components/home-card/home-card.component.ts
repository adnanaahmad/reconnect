import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges, OnDestroy
} from '@angular/core';
import {HomeModel} from '../../../../buyer/favorites/models/favorites.model';
import {Router} from '@angular/router';
import {SearchHomeService} from '../../services/search-home.service';
import {ToastrService} from 'ngx-toastr';
import {StoreService} from '../../../../../../core/store/store.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {take} from 'rxjs/operators';
import {ViewPaymentBreakDownModel} from '../../../property-details/models/property-details.model';
import {Subscription} from 'rxjs';
import {PieChartComponent} from '../../../property-details/popups/pie-chart/pie-chart.component';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() home: HomeModel = {} as HomeModel;
  @Input() loan: any;
  @Output() toggleEvent = new EventEmitter<any>();
  @ViewChild('homeCard') homeCard: ElementRef;
  pieChart: ViewPaymentBreakDownModel = {} as ViewPaymentBreakDownModel;
  subscription: Subscription;
  monthlyPayment: number;
  constructor(public router: Router,
              private searchHomeService: SearchHomeService,
              private toaster: ToastrService,
              public store: StoreService,
              public constant: ConstantService,
              private modalService: NgbModal,
              configuration: NgbModalConfig) {
    configuration.centered = true;
    configuration.container =  'app-search-homes';
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    this.subscription = this.store.toggleLoanType.subscribe(loanType => {
      this.monthlyPayment = this.home.financing[loanType].totalPayment;
      this.pieChart.principalAndInterest = Math.round(this.home.financing[loanType].principalAndInterest);
      this.pieChart.insurance = Math.round(this.home.financing[loanType].insurance);
      this.pieChart.taxes = Math.round(this.home.financing[loanType].taxes);
      this.pieChart.mortgageInsurance = Math.round(this.home.financing[loanType].mortgageInsurance);
      this.pieChart.hoa = Math.round(this.home.hoa);
      this.pieChart.totalPayment = Math.round(this.home.financing[loanType].totalPayment);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  favoriteHome(): void{
    const data = {
      mlsId: this.home.id,
      market: 'mlspin'
    };
    this.home.favourite = !this.home.favourite;
    if (this.home.favourite){
      this.searchHomeService.addFavorite(data).pipe(take(1)).subscribe(res => {
        this.toaster.success('Added To Favorites');
      }, error => {
        this.toaster.error('Failed To Add To Favorites');
      });
    } else {
      this.searchHomeService.removeFavorite(data.mlsId).pipe(take(1)).subscribe(res => {
        this.toaster.success('Removed From Favorites');
      }, error => {
        this.toaster.error('Failed To Remove From Favorites');
      });
    }
  }
  ngAfterViewInit(): void {
    const paragraph = this.homeCard.nativeElement.childNodes[0];
    const readMore = this.homeCard.nativeElement.childNodes[1];
    const height = (paragraph).offsetHeight;
    const lineHeight = getComputedStyle(paragraph).lineHeight;
    const lines = height / parseInt(lineHeight);
    if ( lines <= 5){
      (readMore).style.display = 'none';
    } else{
      (paragraph).style['-webkit-line-clamp'] = 5;
    }
  }
  viewPieChart(): void {
    const modalRef = this.modalService.open(PieChartComponent);
    modalRef.componentInstance.breakDown = this.pieChart;
    modalRef.result.then((result) => {
      if (result !== 'Close click') {
        console.log(result);
      }
    }, error => {
      console.log(error);
    });
  }
  toggle(): void{
    const element = this.homeCard.nativeElement;
    if (!element.children[0].style['-webkit-line-clamp'] || element.children[0].style['-webkit-line-clamp'] === '5'){
      element.children[0].style['-webkit-line-clamp'] = 10000;
      element.children[1].style.display = 'none';
      element.children[2].style.display = 'block';
    } else{
      element.children[0].style['-webkit-line-clamp'] = 5;
      element.children[1].style.display = 'block';
      element.children[2].style.display = 'none';
    }
  }
  get housingRatio(): string{
    return this.loan.fha.housingRatio;
  }
  get debtRatio(): string{
    return this.loan.fha.debtRatio;
  }
}
