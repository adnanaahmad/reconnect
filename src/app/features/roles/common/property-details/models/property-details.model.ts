import {FormGroup, Validators} from '@angular/forms';

export interface PropertyDetailsModel {
  propertyAd: PropertyAdModel;
  realEstateAgent: RealEstateAgentUserModel;
  features: any;
  loanScenarioOne: LoanScenarioModel;
  loanScenarioTwo: LoanScenarioModel;
  tourURL: string;
  rentVsBuying: RentVsBuyingModel;
  publicTransport: PublicTransportModel;
  id: string;
  loader: boolean;
  multiFamilyUnits: any;
}
export interface LoanScenarioModel{
  listings: any;
  userLoan: {
    fha: any;
    va: any;
    usda: any;
    conventional: any;
    homeReady: any;
    homePossible: any;
  };
  purchasePrice: number;
  loanAmount: number;
  financeAmount: number;
  downPayment: number;
  loanRate: number;
  loanTerm: number;
  monthlyPayment: number;
  fundsNeeded: number;
  housingRatio: number;
  debtRatio: number;

}
export interface ViewPaymentBreakDownModel{
  principalAndInterest: number;
  insurance: number;
  taxes: number;
  mortgageInsurance: number;
  hoa: number;
  totalPayment: number;

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
  daysOnMarket: number;
  xf_lot_size: number;
  xf_square_feet: number;
}

interface RealEstateAgentUserModel {
  userId: RealEstateAgentModel;
}

export interface RealEstateAgentModel {
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
  rating: number;
  reviews: number;
  email: string;
  phoneNumber: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    linkedIn: string;
    twitter: string;
    world: string;
  };
  _id: string;
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
  description: string;
  notAvailable: string;
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
