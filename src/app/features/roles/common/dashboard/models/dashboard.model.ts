export interface BorrowersDateModel{
  name: string;
  number: number;
  buyers: Array<BuyerModel>;
}
interface BuyerModel{
  image: string;
  name: string;
  address: string;
  date: Date;
}
export interface DashboardModel {
  dates: DatesModel;
  loader: boolean;
  analytics: AnalyticsModel;
}
export interface DatesModel{
  buyerAnalyticsDateStart: string;
  buyerAnalyticsDateEnd: string;
  personalSalesAnalyticsDateStart: string;
  personalSalesAnalyticsDateEnd: string;
  commissionsAnalyticsDateStart: string;
  commissionsAnalyticsDateEnd: string;
}

export interface AnalyticsModel{
  buyerAnalytics: any;
  commission: any;
  personalSales: any;
  personalVolume: any;
}

export interface PersonalSalesAnalyticsModel{
  canceledDeals: number;
  dealsClosed: number;
  dealsPending: number;
  preApprovalDeals: number;
}
