export interface BorrowersModel {
  buttons: Array<string>;
  selectedButton: string;
  borrower: Array<BorrowerModel>;
}

interface StatusModel {
  application: boolean;
  preApproved: boolean;
  acceptedOffer: boolean;
  underwriting: boolean;
  approvedWithConditions: boolean;
  clearedToClose: boolean;
}

interface BorrowerModel {
  photo: string;
  fullName: string;
  phoneNumber: string;
  targetPropertyAddress: string;
  closingDate: Date;
  commitmentDate: Date;
  homeInspectionDate: Date;
  purchaseSalesDate: Date;
  status: StatusModel;
}
