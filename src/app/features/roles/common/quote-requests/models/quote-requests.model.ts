import {SubjectPropertyModel} from '../../../buyer/home-buying-dashboard/models/dashboard.model';
import {PropertyAdModel} from '../../property-details/models/property-details.model';

export interface QuoteRequestsModel{
  pending: Array<any>;
  accepted: Array<any>;
  rejected: Array<any>;
  teams: Array<any>;
  renderArray: Array<any>;
  selectedButton: string;
  buttons: any;
}
interface QuoteReqModel {
  subjectProperty: PropertyAdModel;
}
