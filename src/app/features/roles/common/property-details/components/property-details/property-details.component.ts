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
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit, OnDestroy {
  propertyDetails: PropertyDetailsModel = {} as PropertyDetailsModel;

  constructor(private fb: FormBuilder,
              public sanitizer: DomSanitizer,
              private propertyDetailService: PropertyDetailsService,
              private activatedRoute: ActivatedRoute,
              public location: Location,
              public store: StoreService,
              public constant: ConstantService) {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.propertyDetails.id = routeParams.get('id');
    this.activatedRoute.queryParams.subscribe(params => {
      if (params.loanType) {
        this.store.updateToggleLoanType(params.loanType);
      }
    });
  }
  ngOnDestroy(): void {
    //this.store.updateToggleLoanType(null);
  }

  ngOnInit(): void {
    this.propertyDetails.loader = false;
    this.getPropertyDetails();
    this.store.toggleLoanType.subscribe(res => {
      window.history.replaceState({}, '', `/home/propertyDetails/${this.propertyDetails.id}?loanType=${res}`);
    });
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
    this.propertyDetailService.getPropertyDetails(this.propertyDetails.id).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.propertyDetails.propertyAd = res.result.listings[0];
      this.propertyDetails.features = res.result.listings[0].features;
      this.propertyDetails.tourURL = this.getVideoId(res.result.listings[0].tourURL);
      this.propertyDetails.loader = true;
      this.propertyDetails.loanScenarioOne = res.result;
      this.propertyDetails.multiFamilyUnits = res.result;
      if (!this.store.toggleLoanTypeSubject.value){
        this.setDefaultLoanType(res.result.userLoan);
      }
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
      //console.log(this.propertyDetails.features);
    }, error => {
      console.log(error);
    });
    this.propertyDetailService.getTeam().pipe(take(1)).subscribe(res => {
        console.log(res);
        this.propertyDetails.realEstateAgent = res.result.realEstateAgent;
    }, error => {
      console.log(error);
    });
  }
  getVideoId(url): string {
    if (!url) {
      return null;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? '//www.youtube.com/embed/' + match[2]
        : null;
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
