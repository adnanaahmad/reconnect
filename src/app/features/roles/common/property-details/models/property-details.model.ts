import {FormGroup} from '@angular/forms';

export interface PropertyDetailsModel {
  propertyAd: PropertyAdModel;
  realEstateAgent: RealEstateAgentModel;
  propertyDetails: PropertyFeaturesModel;
  loanScenarioOne: FormGroup;
  loanScenarioTwo: FormGroup;
  virtualTour: string;
  rentVsBuying: RentVsBuyingModel;
  publicTransport: PublicTransportModel;
  id: number;
}

interface PropertyAdModel {
  listedBy: string;
  album: string[];
  image: string;
  price: number;
  address: string;
  status: string;
  time: string;
  mls: number;
  views: number;
  propertyType: string;
  yearBuilt: number;
  lotSize: number;
  pricePerSqFt: number;
  taxYear: number;
  taxAmount: number;
  garage: number;
  bedrooms: number;
  bathrooms: number;
  sqFt: number;
}

interface RealEstateAgentModel {
  name: string;
  image: string;
  rating: number;
  reviews: number;
  phone: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedIn: string;
    twitter: string;
    world: string;
  };
}


interface PropertyFeaturesModel {
  title: string;
  feature: {
    name: string;
    details: string[];
  }[];
}

interface PublicTransportModel {
  transitScore: {
    name: string,
    value: number
  }[];
  walkScore: {
    name: string,
    value: number
  }[];
  view: [];
  colorScheme: {
    domain: string[]
  };
}

interface RentVsBuyingModel {
  costOfRent: {
    amount: number;
    total: number;
  };
  costOfBuying:{
    total: number;
    breakdown: Array<CostOfBuyingBreakdown>;
  };
}

interface  CostOfBuyingBreakdown {
  name: string;
  amount: number;
  details: {
    name: string;
    amount: number;
  }[];
}
