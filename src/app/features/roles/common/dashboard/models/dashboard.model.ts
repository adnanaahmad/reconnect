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
  teamDynastyAnalyticsDateStart: string;
  teamDynastyAnalyticsDateEnd: string;
}

export interface AnalyticsModel{
  buyerAnalytics: any;
  commission: any;
  personalSales: any;
  personalVolume: any;
  sales: any;
  quoteRequest: any;
  teamDynasty: any;
  DynastySales: any;
}

export interface PersonalSalesAnalyticsModel{
  cancelledDeals: number;
  dealsClosed: number;
  dealsPending: number;
  preApprovalDeals: number;
}
export interface SalesModel{
  averageSaleAmount: number;
  averageLoanAmount: number;
  closedVsPreApproved: number;
  totalPreApprovedCount: number;
  totalSalesAmount: number;
  totalSalesCount: number;
}
