import {SubjectPropertyModel} from '../../../buyer/home-buying-dashboard/models/dashboard.model';

export interface QuoteRequestsModel{
  pending: Array<any>;
  accepted: Array<any>;
  rejected: Array<any>;
  teams: Array<any>;
  renderArray: Array<any>;
  selectedButton: string;
}
interface QuoteReqModel {
  subjectProperty: SubjectPropertyModel;
}
