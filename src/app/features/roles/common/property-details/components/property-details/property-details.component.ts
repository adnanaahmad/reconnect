import { Component, OnInit } from '@angular/core';
import {PropertyDetailsModel} from '../../models/property-details.model';
import {FormBuilder, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss']
})
export class PropertyDetailsComponent implements OnInit {
  propertyDetails: PropertyDetailsModel = {} as PropertyDetailsModel;

  constructor(private fb: FormBuilder, public sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.propertyDetails.propertyAd = {
      listedBy: 'James Hawken Broody',
      album: ['https://i.pinimg.com/originals/ab/86/0b/ab860b0b78eac0a11a098e0ec053346d.jpg',
        'https://wallpapercave.com/wp/wp2124316.jpg',
        'https://www.globexdevelopments.com/Custom-Homes-Photo-Portfolio/304-McArthur-Mt-Prospect/big/House-Front-Driveway.jpg',
        'https://wallpapercave.com/wp/wp2124317.jpg',
        'https://www.wallpapertip.com/wmimgs/220-2208927_house-wallpaper-hd.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcrzLhuvUuLy7QAsqbIVriCoeWFGn4nR-fUA&usqp=CAU'],
      image: '',
      price: 429000,
      address: '123 Main St Auburn, MA 0510',
      status: 'Active',
      time: '10 Days',
      mls: 4324,
      views: 512,
      propertyType: 'Single Family',
      yearBuilt: 1918,
      lotSize: 10534,
      pricePerSqFt: 200,
      taxYear: 2020,
      taxAmount: 5000,
      garage: 1,
      bedrooms: 2,
      bathrooms: 2,
      sqFt: 5621
    };
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
    this.propertyDetails.propertyDetails = {
      title: 'Interior Features',
      feature: [
        {
        name: 'Bedrooms',
        details: ['interior features', 'basement features'],
        },

        {
          name: 'Bedrooms',
          details: ['interior features', 'basement features'],
        },
        {
          name: 'Bedrooms',
          details: ['interior features', 'basement features'],
        },
        {
          name: 'Bedrooms',
          details: ['interior features', 'basement features'],
        },
        {
          name: 'Bedrooms',
          details: ['interior features', 'basement features'],
        },
      ]
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
    this.propertyDetails.virtualTour = 'https://www.youtube.com/embed/7q39Qe9pats';
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
}
