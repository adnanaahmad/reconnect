import {SubjectPropertyModel} from '../../../buyer/home-buying-dashboard/models/dashboard.model';

export interface QuoteRequestsModel{
  quoteRequests: Array<QuoteReqModel>;
  buttons: string[];
  selectedButton: string;
}
interface BuyerModel {
  name: string;
  image: string;
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
}
interface QuoteReqModel {
  buyer: BuyerModel;
  subjectProperty: SubjectPropertyModel;
}
