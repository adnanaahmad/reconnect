export interface BuyerDashboardModel {
  preApprovalDetails: PreApprovalDetailsModel;
  realEstateAgent: TeamModel;
  lender: TeamModel;
  attorney: TeamModel;
  homeInspector: TeamModel;
  insuranceAgent: TeamModel;
  homeBuyingProcess: HomeBuyingProcessModel;
  subjectProperty: SubjectPropertyModel;
}
interface PreApprovalDetailsModel {
   income: number;
   monthlyLiabilities: number;
   assets: number;
 }

interface TeamModel{
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
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
