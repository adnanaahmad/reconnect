import {PropertyAdModel} from '../../../common/property-details/models/property-details.model';

export interface BuyerDashboardModel {
  preApprovalDetails: PreApprovalDetailsModel;
  team: TeamObjectModel;
  homeBuyingProcess: HomeBuyingProcessModel;
  subjectProperty: PropertyAdModel;
  loader: boolean;
  userName: string;
}
interface PreApprovalDetailsModel {
   income: number;
   monthlyLiabilities: number;
   assets: number;
 }

export interface TeamModel{
  firstName: string;
  lastName: string;
  role: string;
  profilePictureUrl: string;
  phoneNumber: string;
  email: string;
}
interface TeamObjectModel{
  realEstateAgent: TeamModel;
  lender: TeamModel;
  attorney: TeamModel;
  homeInspector: TeamModel;
  insuranceAgent: TeamModel;
}
interface HomeBuyingProcessModel {
  application: boolean;
  preApproved: boolean;
  acceptedOffer: boolean;
  underwriting: boolean;
  approvedWithConditions: boolean;
  clearedToClose: boolean;
  closed: boolean;
}
export interface SubjectPropertyModel {
  image: string;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  sqFt: number;
  status: string;
  propertyType: string;
  lotSize: number;
  timeOnMarket: string;
  community: string;
  mls: number;
}
