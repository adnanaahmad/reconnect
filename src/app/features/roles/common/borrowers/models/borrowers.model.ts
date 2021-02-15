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
  closed: boolean;
}

export interface BorrowerModel {
  buyer: {
    email: string;
    firstName: string
    lastName: string
    phoneNumber: string
    profilePictureUrl: string;
  };
  targetPropertyAddress: string;
  closingDate: Date;
  commitmentDate: Date;
  homeInspectionDate: Date;
  purchaseSalesDate: Date;
  loan: {
    processStatus: string
  };
}
