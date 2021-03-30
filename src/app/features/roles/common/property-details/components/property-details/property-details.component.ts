import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertyDetailsModel} from '../../models/property-details.model';
import {FormBuilder, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {PropertyDetailsService} from '../../services/property-details.service';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {take} from 'rxjs/operators';
import {StoreService} from '../../../../../../core/store/store.service';
import {ConstantService} from '../../../../../../core/constant/constant.service';
import {Subscription} from 'rxjs';
import {HelperService} from '../../../../../../core/helper/helper.service';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit, OnDestroy {
  propertyDetails: PropertyDetailsModel = {} as PropertyDetailsModel;
  subscription: Array<Subscription>;

  constructor(private fb: FormBuilder,
              public sanitizer: DomSanitizer,
              private propertyDetailService: PropertyDetailsService,
              private activatedRoute: ActivatedRoute,
              public location: Location,
              public store: StoreService,
              public constant: ConstantService,
              private helper: HelperService) {
    this.subscription = [];
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.propertyDetails.id = routeParams.get('id');
    this.subscription.push(
        this.activatedRoute.queryParams.subscribe(params => {
          if (params.loanType) {
            this.store.updateToggleLoanType(params.loanType);
          }
        })
    );
  }
  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
    this.store.updateToggleLoanType(null);
  }

  ngOnInit(): void {
    this.propertyDetails.loader = false;
    this.getPropertyDetails();
    this.subscription.push(
        this.store.toggleLoanType.subscribe(res => {
          window.history.replaceState({}, '', `/home/propertyDetails/${this.propertyDetails.id}?loanType=${res}`);
        })
    );
    this.propertyDetails.rentVsBuying = {
      costOfRent: {
        amount: 20,
        total: 45000
      },
      costOfBuying: {
        total: 45000,
        breakdown: [
          {
            name: 'Home Enquiry',
            amount: 5340,
            details: [
              {
                name: 'Rent',
                amount: 200
              },
              {
                name: 'Rent',
                amount: 200
              }, ]
          },
          {
            name: 'Home Enquiry',
            amount: 5340,
            details: [
              {
                name: 'Rent',
                amount: 200
              },
              {
                name: 'Rent',
                amount: 200
              }, ]
          },

          {
            name: 'Home Enquiry',
            amount: 5340,
            details: [
              {
                name: 'Rent',
                amount: 200
              },
              {
                name: 'Rent',
                amount: 200
              }, ]
          },
          {
            name: 'Tax Amount',
            amount: 5340,
            details: [
              {
                name: 'Rent',
                amount: 200
              },
              {
                name: 'Rent',
                amount: 200
              }, ]
          }
        ]
      }
    };
  }
  getPropertyDetails(): void{
    this.store.updateProgressBarLoading(true);
    this.propertyDetailService.getPropertyDetails(this.propertyDetails.id).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.propertyDetails.propertyAd = res.result.listings[0];
      this.propertyDetails.features = res.result.listings[0].features;
      this.propertyDetails.tourURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.helper.getEmbeddedVideoURL(res.result.listings[0].tourURL));
      console.log(this.propertyDetails.tourURL);
      this.propertyDetails.loader = true;
      this.propertyDetails.loanScenarioOne = res.result;
      this.propertyDetails.multiFamilyUnits = res.result;
      this.subscription.push(
          this.store.toggleLoanType.subscribe(data => {
            if (data === null){
              this.setDefaultLoanType(res.result.userLoan);
            }
          })
      );
      this.propertyDetails.publicTransport = {
        transitScore: [
            {name: 'Green', value: Number(res.result.listings[0].walkscore.transitScore)},
            {name: 'Gray', value: 100 - Number(res.result.listings[0].walkscore.transitScore)},
        ],
        walkScore: [
            {name: 'Green', value: Number(res.result.listings[0].walkscore.walkScore)},
            {name: 'Gray', value: 100 - Number(res.result.listings[0].walkscore.walkScore)},
        ],
        view: [],
        colorScheme: {
          domain: ['#53E773', '#E7EDF8']
        },
        description: res.result.listings[0].walkscore.description,
        notAvailable: res.result.listings[0].walkscore.transitScore
      };
      this.store.updateProgressBarLoading(false);
    }, error => {
      console.log(error);
      this.store.updateProgressBarLoading(false);
    });
    this.propertyDetailService.getTeam().pipe(take(1)).subscribe(res => {
        console.log(res);
        this.propertyDetails.realEstateAgent = res.result.realEstateAgent;
    }, error => {
      console.log(error);
    });
  }
  setDefaultLoanType(data): void{
    if (data){
      data.fha ? this.store.updateToggleLoanType('fha') :
          data.va ? this.store.updateToggleLoanType('va') :
              data.usda ? this.store.updateToggleLoanType('usda') :
                  data.conventional ? this.store.updateToggleLoanType('conventional') :
                      data.homeReady ? this.store.updateToggleLoanType('homeReady') :
                          data.homePossible ? this.store.updateToggleLoanType('homePossible') :
                              this.store.updateToggleLoanType('null');

    }
  }
  calculationFromApi(queryParam: string): void{
    this.propertyDetailService.getPropertyDetails(`${this.propertyDetails.id}&${queryParam}`).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.propertyDetails.loanScenarioOne = res.result;
      this.propertyDetails.multiFamilyUnits = res.result;
      if (!this.store.toggleLoanTypeSubject.value){
        this.setDefaultLoanType(res.result.userLoan);
      }
    }, error => {
      console.log(error);
    });
  }
}
