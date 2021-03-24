import {FormGroup} from '@angular/forms';

export interface LoanDetailsModel {
  finance: FormGroup;
  disableSave: boolean;
  fixedExpenses: any;
  variableExpenses: any;
}
