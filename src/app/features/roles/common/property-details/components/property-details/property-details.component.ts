import { Component, OnInit } from '@angular/core';
import {PropertyDetailsModel} from '../../models/property-details.model';
import {FormBuilder, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {PropertyDetailsService} from '../../services/property-details.service';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import {take} from 'rxjs/operators';
import {StoreService} from '../../../../../../core/store/store.service';
@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  propertyDetails: PropertyDetailsModel = {} as PropertyDetailsModel;

  constructor(private fb: FormBuilder,
              public sanitizer: DomSanitizer,
              private propertyDetailService: PropertyDetailsService,
              private activatedRoute: ActivatedRoute,
              public location: Location,
              public store: StoreService) {
    const routeParams = this.activatedRoute.snapshot.paramMap;
    this.propertyDetails.id = routeParams.get('id');
  }

  ngOnInit(): void {
    this.propertyDetails.loader = false;
    this.getPropertyDetails();
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
    this.propertyDetails.publicTransport = {
      transitScore: [
        {
          name: 'Green',
          value: 64
        },
        {
          name: 'Gray',
          value: 36
        },
      ],
      walkScore: [
        {
          name: 'Green',
          value: 36
        },
        {
          name: 'Gray',
          value: 64
        },
      ],
      view: [],
      colorScheme: {
        domain: ['#53E773', '#E7EDF8']
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
      this.setDefaultLoanType(res.result.userLoan);
      console.log(this.propertyDetails.features);
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
}
