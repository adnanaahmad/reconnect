import { Component, OnInit } from '@angular/core';
import {PropertyDetailsModel} from '../../models/property-details.model';
import {FormBuilder, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {PropertyDetailsService} from '../../services/property-details.service';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
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
              public location: Location) {
    activatedRoute.queryParams.subscribe(params => {
      this.propertyDetails.id = params.id;
    });
  }

  ngOnInit(): void {
    this.getPropertyDetails();
    this.propertyDetails.realEstateAgent = {
      name: 'Rafael Nadal',
      image: 'https://www.menshairstylestoday.com/wp-content/uploads/2015/12/Professional-Haircuts-For-Men.jpg',
      rating: 5,
      reviews: 1574,
      phone: '+421 32 6 4345',
      socialMedia: {
        facebook: 'https://www.google.com/',
        instagram: 'https://www.google.com/',
        linkedIn: 'https://www.google.com/',
        twitter: 'https://www.google.com/',
        world: 'https://www.google.com/',
        }
    };
    this.propertyDetails.loanScenarioOne = this.fb.group({
      purchasePrice: ['', Validators.required],
      loanAmount: ['', Validators.required],
      financeAmount: ['', Validators.required],
      downPayment: ['', Validators.required],
      loanRate: ['', Validators.required],
      loanTerm: ['', Validators.required],
      monthlyPayment: ['', Validators.required],
      fundsNeeded: ['', Validators.required],
    });
    this.propertyDetails.loanScenarioTwo = this.fb.group({
      purchasePrice: ['', Validators.required],
      loanAmount: ['', Validators.required],
      financeAmount: ['', Validators.required],
      downPayment: ['', Validators.required],
      loanRate: ['', Validators.required],
      loanTerm: ['', Validators.required],
      monthlyPayment: ['', Validators.required],
      fundsNeeded: ['', Validators.required],
    });
    this.propertyDetails.loanScenarioOne.valueChanges.subscribe(x => console.log(x));
    this.propertyDetails.loanScenarioTwo.valueChanges.subscribe(x => console.log(x));
    // this.propertyDetails.tourURL = 'https://www.youtube.com/embed/7q39Qe9pats';
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
    this.propertyDetailService.getPropertyDetails(this.propertyDetails.id).subscribe(res => {
      console.log(res);
      this.propertyDetails.propertyAd = res.result.listings[0];
      this.propertyDetails.features = res.result.listings[0].features;
      this.propertyDetails.tourURL = this.getVideoId(res.result.listings[0].tourURL);
      console.log(this.propertyDetails.features);
    }, error => {
      console.log(error);
    });
  }
  getVideoId(url) {
    if (!url) {
      return null;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? '//www.youtube.com/embed/' + match[2]
        : null;
  }
}
