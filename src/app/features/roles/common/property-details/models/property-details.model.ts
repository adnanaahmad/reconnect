import {FormGroup} from '@angular/forms';

export interface PropertyDetailsModel {
  propertyAd: PropertyAdModel;
  realEstateAgent: RealEstateAgentModel;
  features: any;
  loanScenarioOne: FormGroup;
  loanScenarioTwo: FormGroup;
  tourURL: string;
  rentVsBuying: RentVsBuyingModel;
  publicTransport: PublicTransportModel;
  id: string;
}

export interface PropertyAdModel {
  listingAgent: {
    id: string,
    name: string
  };
  images: string[];
  image: string;
  listPrice: number;
  address: {
    city: string;
    deliveryLine: string;
    state: string;
    street: string;
    zip: string;
  };
  status: string;
  xf_market_time_property: number;
  id: number;
  views: number;
  propertyType: string;
  yearBuilt: number;
  lotSize: {sqft: number, acres: number};
  xf_list_price_per_sqft: number;
  xf_tax_year: number;
  xf_taxes: number;
  xf_garage_spaces: number;
  beds: number;
  baths: {
    total: number,
    full: number,
    half: number
  };
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
  feature: Array<any>;
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
